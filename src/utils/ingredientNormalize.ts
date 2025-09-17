import pluralize from 'pluralize'

export default function ingredientNormalize(ingredients: string[], allIngredients: string[]) {
    try {
        const normalizeIngredients = new Set();
        ingredients.map((ingredient) => {
            const lowercaseIng = ingredient.toLowerCase().trim().replace(/[_-]/g, ' ')
            const formatIng = lowercaseIng.charAt(0).toUpperCase() + lowercaseIng.slice(1)
            const matchIng = allIngredients.find((ing) => pluralize.singular(ing) === pluralize.singular(formatIng))
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