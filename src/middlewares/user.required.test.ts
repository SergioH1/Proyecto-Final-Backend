/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ExtRequest } from '../interfaces/interfaces.models';
import { User } from '../models/user.model';
import { userRequiredForChanges } from './user-required';

describe('When the midellware user required is called', () => {
    let req: Partial<ExtRequest>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction>;
    beforeEach(() => {
        req = {
            params: { id: '123456789012345678901234' },
            tokenPayload: { id: '21331' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
    });
    test('Them in success next is called ', async () => {
        req = {
            params: { id: '123456789012345678901234' },
            tokenPayload: { _id: '21331' },
        };
        await userRequiredForChanges(
            req as Request,
            resp as Response,
            next as NextFunction
        );
        expect(next).toHaveBeenCalled();
    });
});
