import { Router } from 'express';
import { SearchController } from '../controllers/search.controller.js';

export const searchController = new SearchController();

export const searchRouter = Router();

searchRouter.get('/', searchController.getAllController);
