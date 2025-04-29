import type { Context } from 'hono'

export default async function getAllAreas(c: Context) {
      try {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
            const data = await res.json();

            const areas: any[] = (data.meals || []).map((area: any) => (
                  area.strArea
            ));

            return c.json({ areas });
      } catch (error) {
            console.error('Error fetching areas:', error)
            return c.json({ message: 'Internal server error' }, 500)
      }
}
