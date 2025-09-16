import type { Context } from 'hono';
import { rtdb } from '../../utils/firebase';
import type { ingredientsPayload } from '../../types/ingredients.type';

export default async function getIngredients(c: Context) {
  try {
    const snapshot = await rtdb.ref('ingredients').once('value');
    const data: ingredientsPayload[] = snapshot.val();

    if (!data) {
      return c.json({ ingredients: [], message: 'No ingredients found' }, 200);
    }

    return c.json({ ingredients: data }, 200);
  } catch (err) {
    console.error('Error fetching ingredients:', err);
    return c.json({ message: 'Internal server error' }, 500);
  }
}
