/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { Recipe } from '../models/recipe.model.js';
import mongoose from 'mongoose';

export class SearchController {
    getFindByIngredient = async (req: Request, resp: Response) => {
        let { q } = req.query as any;
        q;
        let recipes: Array<mongoose.Document> = [];
        if (typeof q !== 'string' && q !== undefined) {
            for await (const [index, value] of q.entries()) {
                const queryResult = await Recipe.find({
                    keywords: {
                        $regex: value,
                        $options: 'i',
                    },
                });
                queryResult.forEach((result) =>
                    recipes.push(result as mongoose.Document)
                );
            }
        } else {
            recipes = await Recipe.find({
                keywords: {
                    $regex: q,
                    $options: 'i',
                },
            });
        }

        const hash: { [key: string]: boolean } = {};
        recipes = recipes.filter((recipe: mongoose.Document) =>
            hash[recipe.id] ? false : (hash[recipe.id] = true)
        );

        resp.setHeader('Content-type', 'application/json');
        resp.status(202);
        resp.send(Array.from(recipes));
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
