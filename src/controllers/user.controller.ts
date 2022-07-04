import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

import { MongooseController } from './mongoose.controller.js';
import * as aut from '../services/authorization.js';
import { iTokenPayload } from '../interfaces/interfaces.models.js';

export class UserController<T> extends MongooseController<T> {
    constructor(public model: Model<T>) {
        super(model);
    }

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('Content-type', 'application/json');
        resp.send(
            await this.model.find().populate('robots', {
                owner: 0,
            })
        );
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
            result = await this.model
                .findById(req.params.id)
                .populate('robots', {
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
            const newItem = await this.model.create(req.body);
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
        const findUser: any = await this.model.findOne({
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
}
