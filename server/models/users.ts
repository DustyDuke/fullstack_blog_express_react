import sequelize from '../db';
import {Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional} from 'sequelize';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: number,
    firstName: string,
    lastName: string,
    login: string,
    password: string,
    phone: number,
    email: string,
    address: CreationOptional<string>,
    role: string,
    avatar: CreationOptional<string>
}
    const UserModel = sequelize.define<UserModel>('User', {
    id: {type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    login: {type: DataTypes.STRING, unique: true, allowNull: false,
        validate: {
            notEmpty: {
                msg: "Введите логин"
            },
        }},
    password: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false,
        validate: {
            isEmail: {
                msg: 'Не корректный email'
            },
        }
    },
    phone: {type: DataTypes.STRING, unique: true, allowNull: false,
        validate: {
            isInt: true,
            len: {
                args: [11, 11],
                msg: 'Не корректный номер'},
        }
    },
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    avatar: {type: DataTypes.STRING, allowNull: true}
})

export default UserModel
