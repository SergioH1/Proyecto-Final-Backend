import mongoose from 'mongoose';
import { isArray } from 'util';
import { Ingredient } from '../models/ingredient.model.js';
import { Recipe } from '../models/recipe.model.js';
export class findByIngredentController {
    getAllFindController = async (req, res, next) => {
        const { ingredients } = req.query;
        console.log('QUERY PARAMS: ', req.query);
        console.log('LA MIEL EXISTE? ', await Ingredient.findById(ingredients[1]));
        try {
            let recipeByIngredient;
            if (isArray(ingredients)) {
                recipeByIngredient = await Recipe.find({
                    ingredients: {
                        $all: [
                            ingredients.map((ingredientId) => ({
                                $elemMatch: {
                                    ingredient: new mongoose.Types.ObjectId(ingredientId),
                                },
                            })),
                        ],
                    },
                });
            }
            else {
                recipeByIngredient = await Recipe.find({
                    ingredients: {
                        $all: [
                            {
                                $elemMatch: {
                                    ingredient: new mongoose.Types.ObjectId(ingredients),
                                },
                            },
                        ],
                    },
                });
            }
            console.log(recipeByIngredient);
            res.setHeader('Content-type', 'application/json');
            res.send(recipeByIngredient);
        }
        catch (err) {
            next(err);
        }
    };
}
