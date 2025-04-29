import type { Context } from 'hono'

export default async function getMenuSuggestion(c: Context) {
    try {
        const meals: any[] = []
        const mealCount = 10

        while (meals.length < mealCount) {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
            const data = await res.json();
            const newMeal = data.meals[0]
            if (!meals.some(meal => meal.idMeal === newMeal.idMeal)) {
                meals.push(newMeal);
            }
        }
        console.log(meals)
        return c.json({ meals });
    } catch (error) {
        console.error('Error fetching menu by ingredients:', error)
        return c.json({ message: 'Internal server error' }, 500)
    }
}
