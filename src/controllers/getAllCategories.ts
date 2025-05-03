import type { Context } from 'hono'
import { rtdb } from '../utils/firebase';

export default async function getAllCategories(c: Context) {
      try {
            const snapshot = await rtdb.ref('categories').once('value');
            const data = snapshot.val();

            if (!data) {
                  return c.json({ categories: [], message: 'No categories found' }, 200);
            }

            return c.json({ categories: data });
      } catch (error) {
            console.error('Error fetching categories:', error)
            return c.json({ message: 'Internal server error' }, 500)
      }
}
