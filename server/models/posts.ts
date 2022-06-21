import sequelize from '../db';
import {
    Model,
    InferAttributes,
    ForeignKey,
    DataTypes,
    CreationOptional,
    InferCreationAttributes
} from 'sequelize';

interface PostModel extends Model<InferAttributes<PostModel>, InferCreationAttributes<PostModel>> {
    id: number,
    authorId: ForeignKey<number>,
    title: string,
    content: string,
    photo: CreationOptional<string>,
}
const PostModel = sequelize.define<PostModel>('Post', {
    id: {type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true},
    authorId: {type: DataTypes.INTEGER, allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        }, onDelete: 'CASCADE',
    },
    title: {type: DataTypes.STRING, unique: true, allowNull: false,
        validate: {
            notEmpty: {
                msg: "Введите назание"
            },
        }},
    content: {type: DataTypes.STRING, allowNull: false},
    photo: {type: DataTypes.STRING, allowNull: true}

})

export default PostModel
