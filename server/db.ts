import {Sequelize} from 'sequelize';
import envConfig from "./envConfig";

const {POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST} = envConfig;

const sequelize = new Sequelize(
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD, {
        host: POSTGRES_HOST,
        dialect: 'postgres',
});

export default sequelize;
