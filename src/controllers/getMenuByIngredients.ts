import type { Context } from 'hono'

export default async function getMenuByIngredients(c: Context) {
    try {
        const ingredientsParam = c.req.query('ingredients');
        const ingredients = ingredientsParam ? ingredientsParam.split(',').map(i => i.toLowerCase()) : [];

        if (!ingredients.length) {
            return c.json({ message: 'No ingredients provided' }, 400);
        }
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        // Fetch all meals (1 letter at a time)
        const fetches = alphabet.map(letter =>
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
                .then(res => res.json())
                .then(data => data.meals || [])
                .catch(() => [])
        );

        const results = await Promise.all(fetches);
        const allMeals = results.flat();

        // Filter by ingredients
        const filtered = allMeals.filter((meal: any) => {
            const mealIngredients: string[] = [];

            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]?.toLowerCase().trim();
                if (ingredient) mealIngredients.push(ingredient);
            }

            return ingredients.every((ingredient) =>
                mealIngredients.some((mealIng) => mealIng.includes(ingredient))
            );
        });

        return c.json({ meals: filtered });
    } catch (error) {
        console.error('Error fetching menu by ingredients:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
