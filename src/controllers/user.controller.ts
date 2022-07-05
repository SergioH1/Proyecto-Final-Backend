import { NextFunction, Request, Response } from 'express';

import * as aut from '../services/authorization.js';
import { iTokenPayload, iUser } from '../interfaces/interfaces.models.js';
import { User } from '../models/user.model.js';

export class UserController {
    User: iUser | undefined;
    constructor() {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(await User.find().populate('', {}));
    };
    getController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        let result;
        try {
            resp.setHeader('Content-type', 'application/json');
            if (req.params.id.length !== 24) {
                resp.status(404);
                resp.end(JSON.stringify({}));
                throw new Error('Id not found');
            }
            result = await User.findById(req.params.id).populate('robots', {
                owner: 0,
            });
            if (!result) {
                resp.status(406);
                resp.end(JSON.stringify({}));

                throw new Error('Id not found');
            } else {
                resp.end(JSON.stringify(result));
            }
        } catch (err) {
            next(err);
        }
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            req.body.passwd = await aut.encrypt(req.body.passwd, 10);
            const newItem = await User.create(req.body);
            if (!newItem) throw new Error('error');

            resp.setHeader('Content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(newItem));
        } catch (error) {
            next(error);
            return;
        }
    };

    loginController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        const findUser: any = await User.findOne({
            name: req.body.name,
        });
        if (
            !findUser ||
            !(await aut.compare(req.body.passwd, findUser.passwd))
        ) {
            const error = new Error('Invalid user or password');
            error.name = 'UserAuthorizationError';
            next(error);
            return;
        }
        const tokenPayLoad: iTokenPayload = {
            id: findUser.id,
            name: findUser.name,
        };
        const token = aut.createToken(tokenPayLoad);
        resp.status(201);
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify({ token, id: findUser.id }));
    };
    patchController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        const newItem = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!newItem || req.body.email) {
            const error = new Error('Invalid user');
            error.name = 'UserError';
            next(error);
            return;
        }
        resp.setHeader('Content-type', 'application/json');
        resp.send(JSON.stringify(newItem));
    };
}
