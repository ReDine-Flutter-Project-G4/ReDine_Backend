import type { Context } from 'hono'
import { rtdb } from '../utils/firebase';

export default async function getMenuByIngredients(c: Context) {
  try {
    const parseList = (key: string) =>
      (c.req.query(key) || '')
        .split(',')
        .map(i => i.trim().toLowerCase())
        .filter(Boolean);

    const ingredients = parseList('ingredients');
    const avoidances = parseList('avoids');
    const categories = parseList('category');
    const nationalities = parseList('nationality');
    const allergens = parseList('allergens');

    if (
      ingredients.length === 0 &&
      avoidances.length === 0 &&
      categories.length === 0 &&
      nationalities.length === 0 &&
      allergens.length === 0
    ) {
      return c.json({ message: 'No filters provided' }, 400);
    }

    const snapshot = await rtdb.ref('meals').once('value');
    const data = snapshot.val();

    if (!data) {
      return c.json({ meals: [], message: 'No meals found' }, 200);
    }
    const allergenSnapshot = await rtdb.ref('allergens').once('value');
    const allergenMap = allergenSnapshot.val() || {};
    const allergenIngredients: string[] = [];

    allergens.forEach(allergen => {
      const key = Object.keys(allergenMap).find(key => key.toLowerCase() === allergen.toLowerCase());

      if (key) {
        allergenIngredients.push(...allergenMap[key]);
      }
    });

    const filteredMeals = data.filter((meal: any) => {
      const mealIngredients: string[] = [];
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`]?.toLowerCase().trim();
        if (ing) mealIngredients.push(ing);
      }

      const hasAllIngredients = ingredients.length === 0 || ingredients.every(ing =>
        mealIngredients.some(mealIng => mealIng.includes(ing))
      );

      const matchesCategories =
        categories.length === 0 ||
        categories.some(cat => meal.strCategory?.toLowerCase().trim() === cat);

      const matchesNationalities =
        nationalities.length === 0 ||
        nationalities.some(nat => meal.strArea?.toLowerCase().trim() === nat);

      const isAvoidanceSafe =
        avoidances.length === 0 ||
        avoidances.every(avoid =>
          mealIngredients.every(ing => !ing.includes(avoid))
        );

      const isAllergenSafe =
        allergens.length === 0 ||
        mealIngredients.every(ing =>
          !allergenIngredients.some(allergenIng => ing.toLowerCase().includes(allergenIng.toLowerCase()))
        );

      return hasAllIngredients && matchesCategories && matchesNationalities && isAvoidanceSafe && isAllergenSafe;
    });

    const userIngredientsSet = new Set(ingredients);

    const mealsWithMissingCount = filteredMeals.map((meal: any): { missingCount: number; [key: string]: any } => {
      const mealIngredients: string[] = [];
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`]?.toLowerCase().trim();
        if (ing) mealIngredients.push(ing);
      }

      const missingCount = mealIngredients.filter(
        ing => !userIngredientsSet.has(ing)
      ).length;

      return { ...meal, missingCount };
    });

    mealsWithMissingCount.sort((a: { missingCount: number }, b: { missingCount: number }) => a.missingCount - b.missingCount);

    const sortedMeals = mealsWithMissingCount.map(({ missingCount, ...meal }: { missingCount: number; [key: string]: any }) => meal);

    return c.json({ meals: sortedMeals }, 200);
  } catch (error) {
    console.error('Error fetching menu by ingredients:', error);
    return c.json({ message: 'Internal server error' }, 500);
  }
}
