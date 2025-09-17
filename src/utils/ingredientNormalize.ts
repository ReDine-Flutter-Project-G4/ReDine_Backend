import pluralize from 'pluralize';

export default function ingredientNormalize(
  ingredients: string[],
  allIngredients: string[]
) {
  try {
    const lookup = new Map<string, string>();
    for (const ing of allIngredients) {
      const key = pluralize.singular(
        ing.toLowerCase().trim().replace(/[_-]/g, ' ')
      );
      if (!lookup.has(key)) lookup.set(key, ing);
    }

    const result = new Set<string>();

    for (const item of ingredients) {
      const key = pluralize.singular(
        item.toLowerCase().trim().replace(/[_-]/g, ' ')
      );
      const match = lookup.get(key);
      if (match) result.add(match);
    }

    return [...result];
  } catch (err) {
    console.error('Error normalizing ingredients:', err);
    return [];
  }
}
