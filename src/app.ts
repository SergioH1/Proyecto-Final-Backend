import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ingredientRouter } from './router/ingredient.router.js';
import { recipeRouter } from './router/recipes.router.js';
import { userRouter } from './router/user.router.js';
import { errorControl } from './middlewares/error.controller.js';
import { searchRouter } from './router/search.router.js';
// import { findByIngredientRouter } from './router/findBy.router.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/ingredient/', ingredientRouter);
app.use('/ingredients/', ingredientRouter);
app.use('/recipe/', recipeRouter);
app.use('/recipes/', recipeRouter);
app.use('/user/', userRouter);
app.use('/search/', searchRouter);
app.use(errorControl);
// app.use('/testingFind', findByIngredientRouter);
