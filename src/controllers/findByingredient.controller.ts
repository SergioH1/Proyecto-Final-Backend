import { NextFunction, Request, Response } from 'express';

import { Ingredient } from '../models/ingredient.model.js';

export class findByIngredentController {
    getAllFindController = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { ingredients } = req.query;
        try {
            const recipeByIngredient = await Ingredient.find({
                ingredients,
            });
            res.setHeader('Content-type', 'application/json');
            res.send(recipeByIngredient);
        } catch (err) {
            next(err);
        }
    };
}
