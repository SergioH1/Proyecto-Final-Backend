import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

export const userController = new UserController();
export const userRouter = Router();

userRouter.get('/:id', userController.getController);
userRouter.post('/', userController.postController);

userRouter.patch('/:id', userController.patchController);

// userRouter.delete('/:id', userController.deleteController);
