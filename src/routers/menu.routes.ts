import { Hono } from 'hono'
import getMenuByIngredients from '../controllers/menu/getMenuByIngredients'
import getAllMenu from '../controllers/menu/getAllMenu'
import getMenuSuggestion from '../controllers/menu/getMenuSuggestion'

const menu = new Hono()

menu.get('/', getAllMenu)
menu.get('/ingredients', getMenuByIngredients)
menu.get('/suggestion', getMenuSuggestion)

export default menu