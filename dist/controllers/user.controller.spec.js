import { User } from '../models/user.model';
// import { User } from '../models/user.model';
import { UserController } from './user.controller';
import * as aut from '../services/authorization.js';
jest.mock('../services/authorization.js');
describe('Given a instantiated controller Usercontroller', () => {
    let controller;
    let req;
    let resp;
    let next;
    beforeEach(() => {
        req = {
            params: { id: '62b5d4943bc55ff0124f6c1d' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
        controller = new UserController();
    });
    describe('When method getController is called with an invalid id', () => {
        test('Then resp.send should be called', async () => {
            req = {
                params: { id: '12' },
            };
            await controller.getController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    test('Then should be call next function', async () => {
        User.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValueOnce(undefined),
        });
        await controller.getController(req, resp, next);
        expect(resp.send).toHaveBeenCalled();
    });
    describe('When method getController is called with a non existing id', () => {
        test('Then resp.send should be called', async () => {
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce({}),
            });
            await controller.getController(req, resp, next);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({}));
        });
    });
    describe('When method getControllerByToken is called with a existing id', () => {
        test('Then resp.send should be called', async () => {
            req = {
                tokenPayload: { id: '12' },
            };
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce({ user: 'test' }),
            });
            await controller.getControllerByToken(req, resp, next);
            expect(resp.send).toHaveBeenCalledWith(JSON.stringify({ user: 'test' }));
        });
    });
    describe('When method getControllerByToken is called with a non existing id', () => {
        test('Then resp.send should be called', async () => {
            await controller.getControllerByToken(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When method postController is called', () => {
        test('Then resp.send should be called', async () => {
            await controller.postController(req, resp, next);
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
            User.create = jest.fn().mockResolvedValueOnce(req.body);
            await controller.postController(req, resp, next);
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
            aut.compare.mockResolvedValueOnce(false);
            aut.createToken.mockResolvedValueOnce('');
            User.findOne = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce({ recipes: 'test' }),
            });
            await controller.loginController(req, resp, next);
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
        aut.compare.mockResolvedValueOnce(true);
        aut.createToken.mockResolvedValueOnce('');
        User.findOne = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValueOnce({ name: null }),
        });
        await controller.loginController(req, resp, next);
        expect(resp.send).toHaveBeenCalled();
    });
    describe('When method delete controller is called', () => {
        test('Them resp.status  is called with 202', async () => {
            req = {
                params: { id: '123456789012345678901234' },
                tokenPayload: { _id: '21331' },
            };
            let findUser = '21331';
            User.findById = jest.fn().mockResolvedValueOnce(findUser);
            await controller.deleteController(req, resp);
            expect(resp.status).toHaveBeenCalled();
        });
    });
    describe('When the method patchcontroller', () => {
        test('them resp.send function is called', async () => {
            req = {
                params: { id: '123456789012345678901234' },
                tokenPayload: { _id: '21331' },
                body: { name: 'sergio' },
            };
            const findUser = '21331';
            User.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(findUser);
            await controller.patchController(req, resp, next);
            expect(resp.send).toHaveBeenCalled();
        });
        test('Them next function is called ', async () => {
            await controller.patchController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    test('Them resp.end function is called ', async () => {
        req = {
            params: { id: '123456789012345678901234' },
            tokenPayload: { _id: '21331' },
            body: { email: 'sergio@gafjoa.com', name: 'sergio' },
        };
        await controller.patchController(req, resp, next);
        expect(next).toHaveBeenCalled();
    });
    test('Then should be call rest.send wit', async () => {
        User.findById = jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValueOnce(undefined),
        });
        await controller.getControllerByToken(req, resp, next);
        expect(next).toHaveBeenCalled();
    });
    describe('When method addRecipesController is called', () => {
        test('And response is error, then next should be called', async () => {
            await controller.addRecipesController(req, resp, next);
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
            await controller.addRecipesController(req, resp, next);
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
                populate: jest.fn().mockResolvedValueOnce(false),
            });
            await controller.addRecipesController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When method addrecipecontroller is called', () => {
        test('And response is error, then next should be called', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                tokenPayload: {
                    id: '62b5d4943bc55ff0124f6c1d',
                },
                body: {
                    password: '',
                },
            };
            const mockResult = {
                id: '62b5d4943bc55ff0124f6c1e',
                recipes: [],
                save: jest.fn().mockReturnValue({
                    populate: jest.fn(),
                }),
            };
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce(mockResult),
            });
            await controller.addRecipesController(req, resp, next);
            expect(resp.send).toHaveBeenCalled();
        });
        test('And response is ok, then res.send should be called', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                tokenPayload: {
                    id: '62b5d4943bc55ff0124f6c1d',
                },
                body: {
                    password: '',
                },
            };
            const mockResult = {
                id: '62b5d4943bc55ff0124f6c1d',
                recipes: [{ _id: '62b5d4943bc55ff0124f6c1d' }],
                save: jest.fn().mockReturnValue({
                    populate: jest.fn(),
                }),
            };
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce(mockResult),
            });
            await controller.addRecipesController(req, resp, next);
            expect(resp.send).toHaveBeenCalled();
        });
    });
    describe('When method deleterecipecontroller is called', () => {
        test('And response is error, then next should be called', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                tokenPayload: {
                    id: '62b5d4943bc55ff0124f6c1d',
                },
            };
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce(null),
            });
            await controller.deleteRecipesController(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
        test('And response is valid, then resp.send should be called', async () => {
            req = {
                params: { id: '62b5d4943bc55ff0124f6c1d' },
                tokenPayload: {
                    _id: '62b5d4943bc55ff0124f6c1d',
                },
            };
            User.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValueOnce({
                    recipes: [{ _id: '62b5d4943bc55ff0124f6c1d' }],
                    save: jest.fn(),
                }),
            });
            await controller.deleteRecipesController(req, resp, next);
            expect(resp.send).toHaveBeenCalled();
        });
    });
});
