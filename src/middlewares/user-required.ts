import { NextFunction, Request, Response } from 'express';
import { ExtRequest } from '../interfaces/interfaces.models.js';
import { User } from '../models/user.model.js';

export const userRequiredForChanges = async (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    // el usuario tiene acceso al recurso (e.g. Tarea)

    const userID = (req as unknown as ExtRequest).tokenPayload.id;
    const findUser = await User.findById(req.params.id);
    if (String(findUser?.id) === String(userID)) {
        next();
    } else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
