import {NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import envConfig from "../envConfig";
import UserModel from "../models/users";
import apiErrorHandler from "../error/apiErrorHandler";

export const AuthMiddleware = (req: Request & { user: UserModel }, res: Response, next: NextFunction) => {
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return next(apiErrorHandler.Unauthorized('Вы не авторизованы'))
        }
        req.user = jwt.verify(token, envConfig.SECRET_KEY)
        next()

    } catch(e) {
        next(apiErrorHandler.Unauthorized('Вы не авторизованы'))
    }

}
