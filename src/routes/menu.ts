import { Hono } from 'hono'
import getMenuByIngredients from '../controllers/getMenuByIngredients'
import getMenuSuggestion from '../controllers/getMenuSuggestion'

const menu = new Hono()

menu.get('/ingredients', getMenuByIngredients)
menu.get('/suggestion', getMenuSuggestion)

export default menu