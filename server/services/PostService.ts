import PostModel from "../models/posts";
import FileService from "./FileService";
import {fetchPostsOptions, PhotoImage, SendPostData} from "../interfaces/postInterfaces";

class PostService{

    async getAll(options: fetchPostsOptions) {
        return await PostModel.findAndCountAll(options)

    }

    async create(post: PostModel, files: PhotoImage) {
        const isPostExist = await PostModel.findOne({where: {title: post.title}})

        if(isPostExist){
            throw new Error('Пост с таким заголовком уже существует')
        }

            let sendData: SendPostData = post
            if(files) {
                const {photo} = files
                const fileName = FileService({photo, directory: 'posts'})
                sendData = {...sendData, photo: fileName}
            }
            return await PostModel.create(sendData)

    }

    async update(post: PostModel, files: PhotoImage) {
        const fetchedPost = await PostModel.findByPk(post.id).then(post => post).catch(e => e.message)

        if(!fetchedPost){
            throw new Error('Пост не найден')
        }

        const isPostExist = await PostModel.findOne({where: {title: post.title}})

        if(isPostExist){
            throw new Error('Пост с таким заголовком уже существует')
        }

        let sendData: SendPostData = {...fetchedPost, ...post}

        if (files) {
            const {photo} = files
            const fileName = FileService({photo, directory: 'posts'})
            sendData = {...post, photo: fileName}
        }


        Object.keys(sendData).forEach((prop: "title" | "content" | "photo") => fetchedPost.set(prop, sendData[prop]))
        return await fetchedPost.save()
    }

    async delete(id: number) {
        return await PostModel.destroy({where: {id}})
                .then(res => res)
                .catch(e => e.message)
    }
}

export default new PostService()
