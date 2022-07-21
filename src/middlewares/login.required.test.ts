import { NextFunction, Response, Request } from 'express';
import { loginRequired } from './login.required';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

let req: Partial<Request>;
let resp: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
    (req = { get: jest.fn() }), (next = jest.fn());
});
describe('Given the control error', () => {
    describe('When send a error', () => {
        test('Then should be call next without error', async () => {
            req.get = jest.fn().mockReturnValue('bearer');
            jwt.verify = jest.fn().mockReturnValue({});
            await loginRequired(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalled();
        });

        test('Then should be call with tokenError', async () => {
            new Error('token missing or invalid');
            req.get = jest.fn().mockReturnValue('test token');
            jwt.verify = jest.fn().mockReturnValue('string');
            await loginRequired(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalled();
        });

        test('If i do not send a good token, then should be call with tokenError', async () => {
            new Error('token missing or invalid');
            req.get = jest.fn().mockReturnValue('bearer');

            await loginRequired(req as Request, resp as Response, next);
            expect(next).toHaveBeenCalled();
        });
    });
});
