import { Router } from 'express';
import { RecipesController } from '../controllers/recipes.controller.js';
import { Recipe } from '../models/recipe.model.js';

export const recipeController = new RecipesController(Recipe);
export const recipeRouter = Router();

recipeRouter.get('/', recipeController.getAllController);
recipeRouter.get('/:id', recipeController.getController);
recipeRouter.post('/', recipeController.postController);
recipeRouter.patch(
    '/addIngredient/:id',
    recipeController.patchOnlyIngredientController
);
recipeRouter.patch(
    '/addKeywords/:id',
    recipeController.patchOnlyKeywordController
);
recipeRouter.patch('/:id', recipeController.patchController);

recipeRouter.delete('/:id', recipeController.deleteController);
