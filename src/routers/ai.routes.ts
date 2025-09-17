import { Hono } from 'hono'
import postIngredientsClassification from '../controllers/ai/postIngredientsClassification'

const ai = new Hono()

ai.post("/classify", postIngredientsClassification);

export default ai