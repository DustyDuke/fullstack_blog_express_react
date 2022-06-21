import UserModel from "../models/users";

export type TokenAttributes = Pick<UserModel, 'id'| 'email' | 'role'>

export type GenerateToken = ({id, email, role}: TokenAttributes) => string

export type LoginData = { login: string; password: string; }

export interface AvatarImage { avatar: { File, mv: () => void }}

export interface File { files: AvatarImage}
