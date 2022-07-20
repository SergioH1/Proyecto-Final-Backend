import { Request, Response } from 'express';
import { ExtRequest } from '../interfaces/interfaces.models';
import { Recipe } from '../models/recipe.model';
import { SearchController } from './search.controller';

describe('Given the search controller and ', () => {
    let controller: SearchController;
    let req: Partial<ExtRequest>;
    let resp: Partial<Response>;

    beforeEach(() => {
        req = {
            query: { q: 'test' },
            params: { id: '62b5d4943bc55ff0124f6c1d' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };

        controller = new SearchController() as any;
    });
    describe('When method searchController is called with a query with 1 element', () => {
        test('Then res.send should be called', async () => {
            req = {
                query: { q: 'test' },
                params: { id: '62b5d4943bc55ff0124f6c1d' },
            };
            let mockResult = [{}];
            Recipe.find = jest.fn().mockResolvedValueOnce(mockResult);
            await controller.getFindByIngredient(
                req as Request,
                resp as Response
            );
            expect(resp.send).toHaveBeenCalledWith([{}]);
        });
        test('Then res.send should be called', async () => {
            req = {
                query: { q: ['test', 'test'] },
                params: { id: '62b5d4943bc55ff0124f6c1d' },
            };
            let mockResult = [
                {
                    id: 'safdsfaf',
                },
                { id: 'asfasfafs' },
            ];
            Recipe.find = jest.fn().mockResolvedValue(mockResult);

            await controller.getFindByIngredient(
                req as Request,
                resp as Response
            );

            expect(resp.status).toHaveBeenCalled();
        });
    });
    describe('When method getFindByrecipes is called with a query with 1 element', () => {
        test('Then res.send should be called', async () => {
            req = {
                query: { q: 'test' },
                params: { id: '62b5d4943bc55ff0124f6c1d' },
            };
            let mockResult = [{}];
            Recipe.find = jest.fn().mockResolvedValueOnce(mockResult);
            await controller.getFindByRecipes(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalled();
        });
    });
});
