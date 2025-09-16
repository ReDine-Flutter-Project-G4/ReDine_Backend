import type { Context } from 'hono';
import { rtdb } from '../../utils/firebase';

export default async function getMenuSuggestion(c: Context) {
    try {
        const mealCount = 10;
        const snapshot = await rtdb.ref('meals').once('value');
        const data = snapshot.val();

        if (!data) {
            return c.json({ meals: [] });
        }

        const allMeals: any[] = Object.values(data);
        const shuffled = allMeals.sort(() => Math.random() - 0.5);
        const selectedMeals = shuffled.slice(0, mealCount);

        return c.json({ meals: selectedMeals });
    } catch (error) {
        console.error('Error fetching random meals:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}