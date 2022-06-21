import {NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";
import envConfig from "../envConfig";
import apiErrorHandler from "../error/apiErrorHandler";

type Role = 'ADMIN' | 'USER';

export const CheckRoleMiddleware = (role: Role) => {
    return function (req: Request, res: Response, next: NextFunction){
        try {
            const token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, envConfig.SECRET_KEY)
            if(decoded.role !== role){
                return next(apiErrorHandler.Forbidden('Не достаточно прав'))
            }
            next()

        } catch (e) {
            next(apiErrorHandler.Forbidden('Не достаточно прав'))
        }
    }

}
