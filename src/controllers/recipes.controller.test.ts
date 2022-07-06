/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { RecipesController } from './recipes.controller';

describe('Given a instantiated Controller Recipes Controller', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction = jest.fn();
    let mockPopule = jest.fn();
    let mockModel = {
        find: jest.fn().mockReturnValue({ populate: mockPopule }),
        findById: jest
            .fn()
            .mockReturnValue({ populate: jest.fn() })
            .mockReturnValue({ populate: jest.fn() }),
    };
    let controller = new RecipesController(
        mockModel as unknown as mongoose.Model<{}>
    );
    beforeEach(() => {
        req = {
            params: { id: '62b5d4943bc55ff0124f6c1d' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
    });
    describe('When method getAllController is called and it success', () => {
        test('Them in success resp.send should be called with the data', async () => {
            let mockResult = { ingredient: 'Pollo' };
            (mockPopule as jest.Mock).mockResolvedValue({
                populate: jest.fn().mockResolvedValue,
            });

            await controller.getAllController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalled();
        });
    });
});
