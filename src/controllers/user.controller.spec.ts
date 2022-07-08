import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
// import { User } from '../models/user.model';
import { UserController } from './user.controller';
import * as aut from '../services/authorization.js';
import { ExtRequest } from '../interfaces/interfaces.models';

jest.mock('../services/authorization.js');
describe('Given a instantiated controller Usercontroller', () => {
    let controller: UserController;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction>;

    beforeEach(() => {
        req = {
            params: { id: '123456789012345678901234' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
        controller = new UserController() as any;
    });
    describe('When method getController is called with an invalid id', () => {
        test('Then resp.send should be called', async () => {
            req = {
                params: { id: '12' },
            };
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When method getController is called with a existing id', () => {
        test('Then resp.send should be called', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ user: 'test' }),
            });
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ user: 'test' })
            );
        });
    });

    describe('When method getController is called with a non existing id', () => {
        test('Then resp.send should be called', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });

    describe('When method postController is called', () => {
        test('Then resp.send should be called', async () => {
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When method postController is called', () => {
        test('Then resp.send should be called', async () => {
            req = {
                body: {
                    password: '5451542',
                },
            };
            User.create = jest.fn().mockResolvedValue(req.body);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalledWith(201);
        });
    });
    describe('When method loginController is called with error', () => {
        test('Then next function should be called', async () => {
            req = {
                body: {
                    password: '5451542',
                    name: 'Sergio',
                },
            };
            (aut.compare as jest.Mock).mockResolvedValue(false);
            (aut.createToken as jest.Mock).mockResolvedValue('');
            User.findOne = jest.fn().mockReturnValue({ name: req.body.name });
            await controller.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    test('Then next function should be called', async () => {
        req = {
            body: {
                password: '5451542',
                name: 'Sergio',
            },
        };
        (aut.compare as jest.Mock).mockResolvedValue(true);
        (aut.createToken as jest.Mock).mockResolvedValue('');
        User.findOne = jest.fn().mockReturnValue({ name: req.body.name });
        await controller.loginController(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(resp.send).toHaveBeenCalled();
    });
    describe('When method delete controller is called', () => {
        test('Them next is called', async () => {
            await controller.deleteController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
        test('Them resp.status  is called with 202', async () => {
            (req as Partial<ExtRequest>) = {
                params: { id: '123456789012345678901234' },
                tokenPayload: { _id: '21331' },
            };

            let findUser = '21331';
            User.findById = jest.fn().mockResolvedValue(findUser);
            await controller.deleteController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalled();
        });
    });

    describe('When the method patchcontroller', () => {
        test('them resp.send function is called', async () => {
            (req as Partial<ExtRequest>) = {
                params: { id: '123456789012345678901234' },
                tokenPayload: { _id: '21331' },
                body: { name: 'sergio' },
            };
            const findUser = '21331';
            User.findByIdAndUpdate = jest.fn().mockResolvedValue(findUser);
            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalled();
        });
        test('Them next function is called ', async () => {
            await controller.patchController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    test('Them resp.end function is called ', async () => {
        (req as Partial<ExtRequest>) = {
            params: { id: '123456789012345678901234' },
            tokenPayload: { _id: '21331' },
            body: { email: 'sergio@gafjoa.com', name: 'sergio' },
        };

        await controller.patchController(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(next).toHaveBeenCalled();
    });
});
