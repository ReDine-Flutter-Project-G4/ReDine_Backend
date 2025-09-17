import type { Context } from 'hono'
import { rtdb } from '../../utils/firebase';
import type { categoriesPayload } from '../../types/category.type';

export default async function getAllCategories(c: Context) {
      try {
            const snapshot = await rtdb.ref('categories').once('value');
            const data: categoriesPayload[] = snapshot.val();

            if (!data) {
                  return c.json({ categories: [], message: 'No categories found' }, 200);
            }

            return c.json({ categories: data });
      } catch (error) {
            console.error('Error fetching categories:', error)
            return c.json({ message: 'Internal server error' }, 500)
      }
}
