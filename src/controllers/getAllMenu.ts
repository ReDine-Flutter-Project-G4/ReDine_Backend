import type { Context } from 'hono'
import { rtdb } from '../utils/firebase';

export default async function getAllMenu(c: Context) {
    try {
        const snapshot = await rtdb.ref('meals').once('value');
        const data = snapshot.val();
    
        if (!data) {
          return c.json({ meals: [], message: 'No meals found' }, 200);
        }
        return c.json({ meals: data });
    } catch (error) {
        console.error('Error fetching meals:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
