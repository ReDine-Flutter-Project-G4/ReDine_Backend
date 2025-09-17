import { Hono } from 'hono'
import getAllIngredient from '../controllers/meta/getAllIngredients'
import getAllCategory from '../controllers/meta/getAllCategories'
import getAllNationality from '../controllers/meta/getAllAreas'
import getAllAllergen from '../controllers/meta/getAllAllergen'

const meta = new Hono()

meta.get('/ingredients', getAllIngredient)
meta.get('/categories', getAllCategory)
meta.get('/areas', getAllNationality)
meta.get('/allergens', getAllAllergen)

export default meta
