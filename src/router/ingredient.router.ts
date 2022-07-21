import { Router } from 'express';
import { IngredientController } from '../controllers/ingredients.controller.js';
import { Ingredient } from '../models/ingredient.model.js';

export const ingredientController = new IngredientController(Ingredient);
export const ingredientRouter = Router();

ingredientRouter.get('/', ingredientController.getAllController);
ingredientRouter.get('/:id', ingredientController.getController);
// ingredientRouter.post('/', ingredientController.postController);
// ingredientRouter.patch('/:id', ingredientController.patchController);
// ingredientRouter.delete('/:id', ingredientController.deleteController);
