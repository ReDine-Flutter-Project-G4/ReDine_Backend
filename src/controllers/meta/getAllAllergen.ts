import type { Context } from 'hono'
import { rtdb } from '../../utils/firebase';
import type { allergensPayload } from '../../types/allergens.type';

export default async function getAllAllergen(c: Context) {
    try {
        const snapshot = await rtdb.ref('allergens').once('value');
        const data: allergensPayload[] = snapshot.val();
        if (!data) {
            return c.json({ allergen: [], message: 'No allergen found' }, 200);
        }
        const allergenTopics = Object.keys(data);
        return c.json({ allergen: allergenTopics }, 200);
    } catch (error) {
        console.error('Error fetching allergens:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
