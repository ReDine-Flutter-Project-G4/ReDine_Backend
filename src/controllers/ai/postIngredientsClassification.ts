import type { Context } from 'hono'
import FormData from 'form-data';

import axiosInstance from '../../utils/axiosInstances';
import { rtdb } from '../../utils/firebase';
import ingredientNormalize from '../../utils/ingredientNormalize'

import type { ingredientsPayload } from '../../types/ingredients.type';

export default async function postImageClassification(c: Context) {
    try {
        const body = await c.req.parseBody();
        const file = body["file"] as File;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const form = new FormData();
        form.append("file", new Blob([buffer]), file.name);

        const res = await axiosInstance.post("/api/ai/ingredients/detect", form, {
            headers: form.getHeaders ? form.getHeaders() : {},
        });

        const snapshot = await rtdb.ref('ingredients').once('value');
        const data: ingredientsPayload[] = snapshot.val();
        const flatData = data.map(item => item.ingredients);

        const normalizeIng = ingredientNormalize(res.data.detected_ingredients, flatData);
        return c.json({ ingredients: normalizeIng });
    } catch (error) {
        console.error('Error image classification:', error);
        return c.json({ message: 'Internal server error' }, 500);
    }
}
