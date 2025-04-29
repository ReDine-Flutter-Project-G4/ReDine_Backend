import type { Context } from 'hono'

export default async function getMenuSuggestion(c: Context) {
    try {
        const mealCount = 10;
        const maxAttempts = 30; // safety net to avoid infinite loops
        const seenIds = new Set<string>();
        const meals: any[] = [];

        // Fire multiple concurrent requests
        const fetchRandomMeals = async () => {
            const requests = Array.from({ length: mealCount }, () =>
                fetch("https://www.themealdb.com/api/json/v1/1/random.php")
                    .then(res => res.json())
                    .then(data => data.meals?.[0])
                    .catch(() => null)
            );

            const results = await Promise.all(requests);

            for (const meal of results) {
                if (
                    meal &&
                    !seenIds.has(meal.idMeal) &&
                    meals.length < mealCount
                ) {
                    seenIds.add(meal.idMeal);
                    meals.push(meal);
                }
            }
        };

        let attempts = 0;
        while (meals.length < mealCount && attempts < maxAttempts) {
            await fetchRandomMeals();
            attempts++;
        }

        return c.json({ meals });
    } catch (error) {
        console.error('Error fetching random meals:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
