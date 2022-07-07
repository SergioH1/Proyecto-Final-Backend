import { User } from '../models/user.model.js';
export const userRequiredForChanges = async (req, resp, next) => {
    // el usuario tiene acceso al recurso (e.g. Tarea)
    const userID = req.tokenPayload.id;
    const findUser = await User.findById(req.params.id);
    if (String(findUser?.id) === String(userID)) {
        next();
    }
    else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
