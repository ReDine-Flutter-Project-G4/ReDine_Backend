import { Hono } from 'hono'
import getMenuByIngredients from '../controllers/getMenuByIngredients'
import getAllMenu from '../controllers/getAllMenu'
import getMenuSuggestion from '../controllers/getMenuSuggestion'

const menu = new Hono()

menu.get('/', getAllMenu)
menu.get('/ingredients', getMenuByIngredients)
menu.get('/suggestion', getMenuSuggestion)

export default menu