import { NextFunction, Request, Response } from 'express';
import { errorControl } from './error.controller';

let req: Request;
let resp: Partial<Response>;
let next: NextFunction;
let error: Error;

beforeEach(() => {
    (resp = { send: jest.fn(), status: jest.fn() }),
        (error = {
            name: 'UserAuthorizationError',
            message: 'test',
        });
});
describe('Given the errorControl', () => {
    describe('When have a error', () => {
        test('Then resp.status is called', () => {
            errorControl(error, req, resp as Response, next);
            expect(resp.status).toHaveBeenCalled();
        });
        test('Then resp.status is called', () => {
            errorControl(error, req, resp as Response, next);
            expect(resp.status).toHaveBeenCalled();
        });
        test('should first', () => {
            errorControl({} as Error, req, resp as Response, next);
            expect(resp.status).toHaveBeenCalled();
        });
    });
});
