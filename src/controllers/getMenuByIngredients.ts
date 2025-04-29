import type { Context } from 'hono'

export default async function getMenuByIngredients(c: Context) {
    try {
        const ingredientsParam = c.req.query('ingredients')
        const ingredients = ingredientsParam ? ingredientsParam.split(',').map(i => i.toLowerCase()) : []

        if (!ingredients.length) {
            return c.json({ message: 'No ingredients provided' }, 400)
        }

        const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const data = await res.json();
        const meals = data.meals || [];

        const filtered = meals.filter((meal: any) => {
            const mealIngredients: string[] = [];

            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]?.toLowerCase().trim();
                if (ingredient) mealIngredients.push(ingredient);
            }

            return ingredients.every((ingredient) =>
                mealIngredients.some((mealIng) => mealIng.includes(ingredient))
            );
        });
        return c.json({meals: filtered});
    } catch (error) {
        console.error('Error fetching menu by ingredients:', error)
        return c.json({ message: 'Internal server error' }, 500)
    }
}
