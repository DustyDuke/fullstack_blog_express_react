import UserModel from "../models/users";
import envConfig from "../envConfig";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import FileService from "./FileService";
import {AvatarImage, GenerateToken, LoginData, TokenAttributes} from "../interfaces/userInterfaces";

const generateJwt: GenerateToken = ({id, email, role}) => jwt.sign(
    {id, email, role},
    envConfig.SECRET_KEY,
    {expiresIn: '3h'}
)

class UserService {
    async create(user: UserModel, files: AvatarImage) {
        const {login, email, password, phone} = user
        const isEmailExist = await UserModel.findOne({where: {email}})
        const isLoginExist = await UserModel.findOne({where: {login}})
        const isPhoneExist = await UserModel.findOne({where: {phone}})


        if(isEmailExist){
           throw new Error('Пользователь с такой почтой уже зарегистрирован')
        }

        if(isLoginExist){
            throw new Error('Этот логин уже занят')
        }

        if(isPhoneExist){
            throw new Error('Пользователь с таким номером уже есть')
        }

        const hashPassword: string = await bcrypt.hash(password, 5)
        let sendData = {...user, password: hashPassword}

        if(files) {
            const {avatar} = files
            const fileName = FileService({photo: avatar, directory: 'users'})
            sendData = {...sendData, avatar: fileName}
        }
        return await UserModel.create(sendData).then(user => {
            const {id, email: newMail, role} = user
            const token: string = generateJwt({id, email: newMail, role})
            return {user, token}
        }).catch(err => {
            const errors = {};
            err.errors.map( er => {
                errors[er.path] = er.message;
            })
            return errors
        })

    }

    async login(loginData: LoginData) {
            const {login, password} = loginData
            const user = await UserModel.findOne({where: {login}})

            if (!user) {
                throw new Error('Пользователь не существует')
            }

            const comparePassword = bcrypt.compare(password, user.password)

            if (!comparePassword) {
                throw new Error('Не верный пароль')
            }

            const {id, email, role} = user
            return generateJwt({id, email, role})
    }

    async getUser(id: number) {

        const user = await UserModel.findOne({where: {id}})
        if(!user){
            throw new Error("Пользователь не найден")
        }
        return user
    }

    async check(userParams: TokenAttributes) {
        return generateJwt(userParams)
    }

    async delete(id: number) {

        return await UserModel.destroy({where: {id}})
            .then(res => res)
            .catch(e => e.message)

    }

}
export default new UserService()
