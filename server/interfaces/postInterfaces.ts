export interface PhotoImage { photo: { File, mv: Function }}

export interface SendPostData { photo: string, title: string, content: string }

export interface Files { files: PhotoImage }

export type fetchPostsOptions = {
    where?: {
        authorId: number,
    }
    page: number,
    limit: number,
    offset: number
}
