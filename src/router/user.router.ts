import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

export const userController = new UserController();
export const userRouter = Router();

userRouter.get('/:id', userController.getController);
userRouter.post('/', userController.postController);
userRouter.post('/login', userController.loginController);
userRouter.delete('/:id', userController.deleteController);
userRouter.patch('/:id', userController.patchController);
