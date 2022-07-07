import { verifyToken } from '../services/authorization.js';
export const loginRequired = (req, resp, next) => {
    const authorization = req.get('authorization');
    let token;
    const tokenError = new Error('Token missing or invalid');
    tokenError.name = 'TokenError';
    let decodedToken;
    if (authorization &&
        authorization.toLocaleLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
        decodedToken = verifyToken(token);
        if (typeof decodedToken === 'string') {
            next(tokenError);
        }
        else {
            req.tokenPayload = decodedToken;
            next();
        }
    }
    else {
        next(tokenError);
    }
};
