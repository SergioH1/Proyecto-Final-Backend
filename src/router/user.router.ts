import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { userRequiredForChanges } from '../middlewares/user.required.js';
import { loginRequired } from '../middlewares/login.required.js';
export const userController = new UserController();

export const userRouter = Router();

userRouter.get('/:id', userController.getController);

userRouter.post('/', userController.postController);
userRouter.post('/login', userController.loginController);
userRouter.delete(
    '/:id',
    loginRequired,
    userRequiredForChanges,
    userController.deleteController
);
userRouter.patch(
    '/:id',
    loginRequired,
    userRequiredForChanges,
    userController.patchController
);
userRouter.patch(
    '/addrecipes',
    userRequiredForChanges,
    userController.addRecipesController
);
