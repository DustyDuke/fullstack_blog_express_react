import Router from 'express'
import UserController from '../controllers/userController'
import {AuthMiddleware} from "../middleware/AuthMiddleware";
import {CheckRoleMiddleware} from "../middleware/CheckRoleMiddleware";

const usersRouter = Router();

usersRouter.get('/auth', AuthMiddleware, UserController.check)
usersRouter.get('/profile/:id', AuthMiddleware, UserController.getProfile)
usersRouter.post('/login', UserController.login)
usersRouter.post('/registration', UserController.registration)
usersRouter.delete('/delete', AuthMiddleware, CheckRoleMiddleware("ADMIN"), UserController.delete)

export default usersRouter;
