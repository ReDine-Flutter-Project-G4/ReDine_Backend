import { Hono } from 'hono'
import getAllIngredient from '../controllers/getAllIngredients'
import getAllCategory from '../controllers/getAllCategories'
import getAllNationality from '../controllers/getAllAreas'

const meta = new Hono()

meta.get('/ingredients', getAllIngredient)     // /api/ingredients
meta.get('/categories', getAllCategory)        // /api/categories
meta.get('/areas', getAllNationality)  // /api/areas

export default meta
