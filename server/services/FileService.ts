import path from "path";
import {v4 as uuidv4 } from 'uuid';

type fileAttributes = {
    photo: { File; mv: Function },
    directory: string
}

type createFileFunction = ({photo, directory}: fileAttributes) => string

const FileService: createFileFunction = ({photo, directory}: fileAttributes) => {
    try {
        const fileName: string = uuidv4() + '.jpg'
        photo.mv(path.resolve(__dirname, '..', `static/${directory}`, fileName))
        return fileName
    } catch(e){
        throw new Error('ошибка загрузки файла')
    }
}

export default FileService
