import { NextFunction, Request, Response } from 'express';

import * as aut from '../services/authorization.js';
import { ExtRequest, iTokenPayload } from '../interfaces/interfaces.models.js';
import { User } from '../models/user.model.js';
import { HydratedDocument } from 'mongoose';

export interface iUser {
    id?: string;
    userName: string;
    email: string;
    password: string;
    avatar: string;
    recipes?: Array<string>;
}
export class UserController {
    getControllerByToken = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        resp.setHeader('Content-type', 'application/json');
        let user;
        req as ExtRequest;
        console.log((req as ExtRequest).tokenPayload, 'soy un token');
        try {
            user = await User.findById(
                (req as ExtRequest).tokenPayload.id
            ).populate('recipes');
        } catch (error) {
            next(error);
            return;
        }

        if (user) {
            resp.send(JSON.stringify(user));
        } else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };
    getController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        resp.setHeader('Content-type', 'application/json');
        let user;
        try {
            user = await User.findById(req.params.id).populate('recipes');
        } catch (error) {
            next(error);
            return;
        }

        if (user) {
            resp.send(JSON.stringify(user));
        } else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        let newUser: HydratedDocument<any>;
        try {
            req.body.password = await aut.encrypt(req.body.password);
            newUser = await User.create(req.body);
        } catch (error) {
            console.log(error);
            next(RangeError);
            return;
        }
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(newUser));
    };

    loginController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        const findUser: any = await User.findOne({
            email: req.body.email,
        }).populate('recipes');

        if (
            !findUser ||
            !(await aut.compare(req.body.password, findUser.password))
        ) {
            const error = new Error('Invalid user or password');
            error.name = 'UserAuthorizationError';
            next(error);
            return;
        }
        const tokenPayLoad: iTokenPayload = {
            id: findUser.id,
            userName: findUser.Username,
        };

        const token = aut.createToken(tokenPayLoad);

        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify({ token, user: findUser }));
    };

    deleteController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const deletedItem = await User.findByIdAndDelete(req.params._id);

            resp.status(202);
            resp.send(JSON.stringify(deletedItem));
        } catch (error) {
            next(error);
            return;
        }
    };

    patchController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const newItem = await User.findByIdAndUpdate(
                (req as unknown as ExtRequest).tokenPayload.id,
                req.body
            );

            if (!newItem || req.body.email) {
                const error = new Error('Invalid user');
                error.name = 'UserError';
                next(error);
                return;
            }
            resp.setHeader('Content-type', 'application/json');
            resp.send(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };
    addRecipesController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const idRecipe = req.params.id;
            const { id } = (req as ExtRequest).tokenPayload;

            let findUser: any = (await User.findById(id).populate(
                'recipes'
            )) as HydratedDocument<iUser>;
            if (findUser === null) {
                next('UserError');
                return;
            }
            if (
                findUser.recipes.some(
                    (item: any) => item._id.toString() === idRecipe
                )
            ) {
                resp.send(JSON.stringify(findUser));
                const error = new Error('Workout already added to favorites');
                error.name = 'ValidationError';
                next(error);
            } else {
                findUser.recipes.push(idRecipe);
                findUser = await (await findUser.save()).populate('recipes');
                resp.setHeader('Content-type', 'application/json');
                resp.status(201);
                resp.send(JSON.stringify(findUser));
            }
        } catch (error) {
            next('RangeError');
        }
    };
}
