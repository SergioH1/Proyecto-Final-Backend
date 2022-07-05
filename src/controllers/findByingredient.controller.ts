// import { NextFunction, Request, Response } from 'express';
// import mongoose from 'mongoose';
// import { isArray } from 'util';
// import { Ingredient } from '../models/ingredient.model.js';

// import { Recipe } from '../models/recipe.model.js';

// export class findByIngredentController {
//     getAllFindController = async (
//         req: Request,
//         res: Response,
//         next: NextFunction
//     ) => {
//         const { ingredients } = req.query;
//         console.log('QUERY PARAMS: ', req.query);
//         console.log(
//             'LA MIEL EXISTE? ',
//             await Ingredient.findById((ingredients as string[])[1])
//         );
//         try {
//             let recipeByIngredient: any;
//             if (isArray(ingredients)) {
//                 recipeByIngredient = await Recipe.find({
//                     ingredients: {
//                         $all: [
//                             (ingredients as string[]).map(
//                                 (ingredientId: string) => ({
//                                     $elemMatch: {
//                                         ingredient: new mongoose.Types.ObjectId(
//                                             ingredientId
//                                         ),
//                                     },
//                                 })
//                             ),
//                         ],
//                     },
//                 });
//             } else {
//                 recipeByIngredient = await Recipe.find({
//                     ingredients: {
//                         $all: [
//                             {
//                                 $elemMatch: {
//                                     ingredient: new mongoose.Types.ObjectId(
//                                         ingredients as string
//                                     ),
//                                 },
//                             },
//                         ],
//                     },
//                 });
//             }

//             console.log(recipeByIngredient);
//             res.setHeader('Content-type', 'application/json');
//             res.send(recipeByIngredient);
//         } catch (err) {
//             next(err);
//         }
//     };
// }
