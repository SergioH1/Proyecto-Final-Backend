import { Request, Response } from 'express';
import { Recipe } from '../models/recipe.model.js';
export class SearchController {
    getFindByIngredient = async (req: Request, resp: Response) => {
        const recipes = await Recipe.find({
            keywords: { $regex: req.query.q, $options: 'i' },
        });

        resp.setHeader('Content-type', 'application/json');
        resp.status(202);
        resp.send(JSON.stringify(recipes));
    };
    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.end(JSON.stringify(await Recipe.find()));
    };
}
