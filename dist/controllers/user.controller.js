import * as aut from '../services/authorization.js';
import { User } from '../models/user.model.js';
export class UserController {
    getControllerByToken = async (req, resp, next) => {
        resp.setHeader('Content-type', 'application/json');
        let user;
        req;
        try {
            user = await User.findById(req.tokenPayload.id).populate('recipes');
        }
        catch (error) {
            next(error);
            return;
        }
        if (user) {
            resp.send(JSON.stringify(user));
        }
        else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };
    getController = async (req, resp, next) => {
        resp.setHeader('Content-type', 'application/json');
        let user;
        try {
            user = await User.findById(req.params.id).populate('recipes');
        }
        catch (error) {
            next(error);
            return;
        }
        if (user) {
            resp.send(JSON.stringify(user));
        }
        else {
            resp.status(404);
            resp.send(JSON.stringify({}));
        }
    };
    postController = async (req, resp, next) => {
        let newUser;
        try {
            req.body.password = await aut.encrypt(req.body.password);
            newUser = await User.create(req.body);
        }
        catch (error) {
            next(RangeError);
            return;
        }
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(newUser));
    };
    loginController = async (req, resp, next) => {
        const findUser = await User.findOne({
            email: req.body.email,
        }).populate('recipes');
        if (!findUser ||
            !(await aut.compare(req.body.password, findUser.password))) {
            const error = new Error('Invalid user or password');
            error.name = 'UserAuthorizationError';
            next(error);
            return;
        }
        const tokenPayLoad = {
            id: findUser.id,
            userName: findUser.Username,
        };
        const token = aut.createToken(tokenPayLoad);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify({ token, user: findUser }));
    };
    deleteController = async (req, resp) => {
        const deletedItem = await User.findByIdAndDelete(req.params._id);
        resp.status(202);
        resp.send(JSON.stringify(deletedItem));
    };
    patchController = async (req, resp, next) => {
        try {
            const newItem = await User.findByIdAndUpdate(req.tokenPayload.id, req.body);
            if (!newItem || req.body.email) {
                const error = new Error('Invalid user');
                error.name = 'UserError';
                next(error);
                return;
            }
            resp.setHeader('Content-type', 'application/json');
            resp.send(JSON.stringify(newItem));
        }
        catch (error) {
            next(error);
        }
    };
    addRecipesController = async (req, resp, next) => {
        try {
            const idRecipe = req.params.id;
            const { id } = req.tokenPayload;
            let findUser = (await User.findById(id).populate('recipes'));
            if (findUser === null) {
                next('UserError');
                return;
            }
            if (findUser.recipes.some((item) => item._id.toString() === idRecipe)) {
                resp.send(JSON.stringify(findUser));
                const error = new Error('Workout already added to favorites');
                error.name = 'ValidationError';
                next(error);
            }
            else {
                findUser.recipes.push(idRecipe);
                findUser = await (await findUser.save()).populate('recipes');
                resp.setHeader('Content-type', 'application/json');
                resp.status(201);
                resp.send(JSON.stringify(findUser));
            }
        }
        catch (error) {
            next('RangeError');
        }
    };
    deleteRecipesController = async (req, resp, next) => {
        const idRecipe = req.params.id;
        const { id } = req.tokenPayload;
        const findUser = (await User.findById(id).populate('recipes'));
        if (findUser === null) {
            next('UserError');
            return;
        }
        findUser.recipes = findUser.recipes.filter((item) => item._id.toString() !== idRecipe);
        findUser.save();
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.send(JSON.stringify(findUser));
    };
}
