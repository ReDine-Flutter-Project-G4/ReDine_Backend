import type { areasPayload } from '../../types/area.type';
import type { Context } from 'hono'
import { rtdb } from '../../utils/firebase';

export default async function getAllAreas(c: Context) {
      try {
            const snapshot = await rtdb.ref('areas').once('value');
            const data: areasPayload[] = snapshot.val();

            if (!data) {
                  return c.json({ areas: [], message: 'No areas found' }, 200);
            }

            return c.json({ areas: data });
      } catch (error) {
            console.error('Error fetching areas:', error)
            return c.json({ message: 'Internal server error' }, 500)
      }
}
