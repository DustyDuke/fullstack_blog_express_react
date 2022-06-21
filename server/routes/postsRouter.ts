import Router from 'express'
import PostsController from '../controllers/postControllers'

const postRouter = Router();

postRouter.post('/create', PostsController.create)
postRouter.get('/', PostsController.getAll)
postRouter.put('/:id', PostsController.update)
postRouter.delete('/:id', PostsController.delete)

export default postRouter;
