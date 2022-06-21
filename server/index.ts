import express, {Express} from 'express';
import sequelize from './db';
import cors from 'cors';
import router from './routes';
import envConfig from "./envConfig";
import fileUpload from "express-fileupload"
import path from 'path'
import {ErrorHandlerMiddleware} from "./middleware/ErrorHandlerMiddleware";
const PORT = envConfig.PORT;

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(ErrorHandlerMiddleware())


async function App(){
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`App started on ` + PORT)
        })
    } catch (error) {
        console.error(error.message);
    }
}

App()
