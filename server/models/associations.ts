import PostModel from "./posts";
import UserModel from "./users";


UserModel.hasMany(PostModel)

PostModel.belongsTo(UserModel, {foreignKey: 'authorId', onDelete: 'CASCADE'})
