import pluralize from 'pluralize'

export default function ingredientNormalize(ingredients: string[], allIngredients: string[]) {
  try {
    const normalizeIngredients = new Set();
    ingredients.map((ingredient) => {
        const lowercaseIng = ingredient.toLowerCase().trim().replace(/[_-]/g, ' ')
        const splitIng = lowercaseIng.split(" ")
        const captializeIng = splitIng.map((ing) => ing.charAt(0).toUpperCase() + ing.slice(1))
        const normalizeIng = captializeIng.join(" ")
        console.log(ingredient)
        const matchIng = allIngredients.find((ing) => pluralize.singular(ing) === pluralize.singular(normalizeIng))
        if (matchIng) {
            normalizeIngredients.add(matchIng)
        }
    });
    return Array.from(normalizeIngredients);
  } catch (error) {
    console.error('Error normalizing ingredients:', error);
    return [];
  }
}