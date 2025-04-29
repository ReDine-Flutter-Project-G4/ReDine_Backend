import type { Context } from 'hono'

export default async function getAllCategories(c: Context) {
      try {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
            const data = await res.json();
            
            const categories: any[] = (data.meals || []).map((category: any) => (
                  category.strCategory
            ));

            return c.json({ categories });
      } catch (error) {
            console.error('Error fetching categories:', error)
            return c.json({ message: 'Internal server error' }, 500)
      }
}
