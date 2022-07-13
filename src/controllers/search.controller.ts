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
}

// getFindByIngredient = async (req: Request, resp: Response) => {
//     let query = req.query.q as string | Array<string> | undefined;
//     let recipes: Array<Document> = [];
//     if (typeof query !== 'string' && query !== undefined) {
//         let recipes = await Recipe.find({
//             keywords: { $regex: query[0], $options: 'i' },
//         });

// for (let i = 1; i < query.length; i++) {
//     recipes = recipes.filter((recipe) =>
//         recipe.keywords?.includes((query as Array<string>)[i])
//     );
//     console.log(query[0], query[1]);
//     recipes = await Recipe.find({
//         keywords: {
//             $in: [query[0], query[1]],
//         },
//     });
//     console.log(recipes);
// }
// } else {
//     recipes = await Recipe.find({
//         keywords: { $regex: query, $options: 'i' },
//     });
// }

// getFindByRecipes = async (req: Request, resp: Response) => {
//     const recipes = await Recipe.find({
//         title: { $regex: req.query.q, $options: 'i' },
//     });

//     resp.setHeader('Content-type', 'application/json');
//     resp.status(202);
//     resp.send(JSON.stringify(recipes));
// };
// //     };
//     };
// }
