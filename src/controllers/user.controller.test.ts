import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
// import { User } from '../models/user.model';
import { UserController } from './user.controller';
// import * as aut from '../services/authorization.js';
import { ExtRequest } from '../interfaces/interfaces.models';

describe('Name of the group', () => {
    let controller: UserController;
    let req: Partial<ExtRequest>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction>;

    beforeEach(() => {
        req = {
            tokenPayload: { id: '123456789012345678901234' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
        controller = new UserController() as any;
    });
    test('Then should be call rest.send wit', async () => {
        User.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValueOnce(undefined),
        });

        await controller.getControllerByToken(
            req as Request,
            resp as Response,
            next as NextFunction
        );

        expect(resp.status).toHaveBeenCalledWith(404);
    });
    describe('When method addRecipesController is called', () => {
        test('And response is error, then next should be called', async () => {
            await controller.addRecipesController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
        test('And response is ok, then resp.send should be called', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                tokenPayload: {
                    id: '62b9e534a202c8a096e0d7ba',
                },
            };

            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce(null),
            });
            await controller.addRecipesController(
                req as ExtRequest,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
        test('And response is ok, then resp.send should be called', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                tokenPayload: {
                    id: '62b9e534a202c8a096e0d7ba',
                },
            };
            const mockResult = {
                userName: '2',
                email: '',
                password: 's',
                recipes: [],
            };
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce(mockResult),
            });
            await controller.addRecipesController(
                req as ExtRequest,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
});
