import {NextFunction, Request, Response} from "express";

export const ErrorHandlerMiddleware = () => {
    return function (error: Error & {status?: number}, req: Request, res: Response, next: NextFunction){

        if(error.status) {
            return res.status(error.status).json({message: error.message})
        }
        return res.status(500).json({message: 'Не известная ошибка'})
    }

}
