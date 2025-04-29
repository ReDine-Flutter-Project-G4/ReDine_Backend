import type { Context } from 'hono'

export default async function getMenuByIngredients(c: Context) {
  try {
    const parseList = (key: string) =>
      (c.req.query(key) || '')
        .split(',')
        .map(i => i.trim().toLowerCase())
        .filter(Boolean);

    const ingredients = parseList('ingredients');
    const avoidances = parseList('avoidances');
    const categories = parseList('category');
    const nationalities = parseList('nationality');

    // If all filters are empty, return error
    if (
      ingredients.length === 0 &&
      avoidances.length === 0 &&
      categories.length === 0 &&
      nationalities.length === 0
    ) {
      return c.json({ message: 'No filters provided' }, 400);
    }

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const fetches = alphabet.map(letter =>
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(res => res.json())
        .then(data => data.meals || [])
        .catch(() => [])
    );

    const results = await Promise.all(fetches);
    const allMeals = results.flat();

    const filtered = allMeals.filter((meal: any) => {
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
        avoidances.every(avoidance =>
          mealIngredients.every(ing => ing !== avoidance)
        );


      return hasAllIngredients && matchesCategories && matchesNationalities && isAvoidanceSafe;
    });

    return c.json({ meals: filtered }, 200);
  } catch (error) {
    console.error('Error fetching menu by ingredients:', error);
    return c.json({ message: 'Internal server error' }, 500);
  }
}
