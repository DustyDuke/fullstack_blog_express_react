import {NextFunction, Request, Response} from "express";
import userService from "../services/UserService";
import {File} from "../interfaces/userInterfaces";
import apiErrorHandler from "../error/apiErrorHandler";

class UserController {

    async registration(req: Request & File, res: Response, next: NextFunction) {
        try {
            const {files} = req
            const newUser = await userService.create(req.body, files)
            return res.json(newUser)
        } catch (e) {
            return next(apiErrorHandler.BadRequest(e.message))
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await userService.login(req.body)
            return res.json({token})

        } catch(e) {
            return next(apiErrorHandler.BadRequest(e.message))
        }
    }

    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await userService.getUser(parseInt(req.params.id))
            return res.json(user)
        } catch (e) {
            return next(apiErrorHandler.NotFound(e.message))
        }
    }

    async check(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.body
            if(!id){
                return next(apiErrorHandler.NotFound("id не указан"))
            }
            const token = userService.check(req.body)
            return res.json({token})
        } catch (e) {
            return next(apiErrorHandler.Unauthorized(e.message))
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.body
            if(!id){
                return next(apiErrorHandler.NotFound("id не указан"))
            }
            await userService.delete(id)
            return res.json("Пользователь и его записи удалены")
        } catch (e) {
            next(apiErrorHandler.BadRequest(e.message))
        }
      }

}

export default new UserController();
