import type { Context } from 'hono'

export default async function getAllIngredient(c: Context) {
      try {
            const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
            const data = await res.json();

            const ingredients: any[] = (data.meals || []).map((ingredient: any) => (
                  ingredient.strIngredient
            ));

            return c.json({ ingredients });
      } catch (error) {
            console.error('Error fetching ingredients:', error)
            return c.json({ message: 'Internal server error' }, 500)
      }
}

