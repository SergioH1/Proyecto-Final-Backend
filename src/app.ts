import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ingredientRouter } from './router/ingredient.router.js';
import { recipeRouter } from './router/recipes.router.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/ingredient/', ingredientRouter);
app.use('/ingredients/', ingredientRouter);
app.use('/recipe/', recipeRouter);
app.use('/recipes/', recipeRouter);
