import {NextFunction, Request, Response} from "express";
import PostService from "../services/PostService";
import {fetchPostsOptions, Files} from "../interfaces/postInterfaces";
import PostModel from "../models/posts";
import apiErrorHandler from "../error/apiErrorHandler";

class PostsController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = +req.query.authorId
            const page = +req.query.page || 1
            const limit = +req.query.limit || 5
            const offset = page * limit - limit

            const options: fetchPostsOptions = authorId ? {where: {authorId}, limit, offset, page} : {limit, offset, page}
            const posts = await PostService.getAll(options)
            return res.json(posts)
        } catch (e) {
            return next(apiErrorHandler.BadRequest(e.message))
        }

    }

    async create(req: Request & Files, res: Response, next: NextFunction) {
        try {
            const {files} = req

            const newPost: PostModel = await PostService.create(req.body, files)
            return res.json(newPost)
        } catch (e) {
            return next(apiErrorHandler.BadRequest(e.message))
        }

    }

    async update(req: Request & Files, res: Response, next: NextFunction) {
        try {
            const {files} = req
            const updatedPost = await PostService.update(req.body, files)
            return res.json(updatedPost)

        } catch (e) {
            return next(apiErrorHandler.BadRequest(e.message))
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
            const {id} = req.body
            if(!id){
                return next(apiErrorHandler.NotFound( 'Пост не найден'))
            }
            await PostService.delete(id)
                .then(() => res.json("Пост удалён"))
                .catch(e => next(apiErrorHandler.BadRequest(e.message)))

    }

}

export default new PostsController;
