/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { Recipe } from '../models/recipe.model.js';
export class SearchController {
    getFindByIngredient = async (req: Request, resp: Response) => {
        let query = req.query.q as string | Array<string> | undefined;
        let recipes: Array<Document> = [];
        if (typeof query !== 'string' && query !== undefined) {
            // let recipes = await Recipe.find({
            //     keywords: { $regex: query[0], $options: 'i' },
            // });

            // for (let i = 1; i < query.length; i++) {
            //     recipes = recipes.filter((recipe) =>
            //         recipe.keywords?.includes((query as Array<string>)[i])
            //     );

            recipes = await Recipe.find({
                keywords: {
                    $all: [query[0], query[1]],
                },
            });

            // }
        } else {
            recipes = await Recipe.find({
                keywords: { $regex: query, $options: 'i' },
            });
        }

        resp.setHeader('Content-type', 'application/json');
        resp.status(202);
        resp.send(JSON.stringify(recipes));
    };
    getFindByRecipes = async (req: Request, resp: Response) => {
        const recipes = await Recipe.find({
            title: { $regex: req.query.q, $options: 'i' },
        });

        resp.setHeader('Content-type', 'application/json');
        resp.status(202);
        resp.send(JSON.stringify(recipes));
    };
}
