import * as dotenv from 'dotenv';

dotenv.config();

const envConfig = {
    PORT: process.env.PORT || 8080,
    POSTGRES_DB: process.env.POSTGRES_DB || 'pet_projectdb',
    POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'root',
    POSTGRES_HOST: process.env.POSTGRES_HOST || '127.0.0.1',
    POSTGRES_PORT: process.env.POSTGRES_PORT || '5432',
    SECRET_KEY: process.env.SECRET_KEY
};

export default envConfig
