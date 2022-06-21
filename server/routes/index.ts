import Router from 'express'
import usersRouter from "./usersRouter";
import postRouter from "./postsRouter";

const router = Router();

router.use('/user', usersRouter)
router.use('/posts', postRouter)

export default router;
