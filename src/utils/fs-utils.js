import { join, extname } from "path"
import fs from "fs-extra"
import { v4 as uuid } from "uuid"


export const PUBLIC_FOLDER_PATH = join(process.cwd(), "public")

export const saveFile = async (file, uniqueName = false) => {

    try {
        const fileName = uniqueName ? `${uuid()}${extname(file.originalname )}` : file.originalname
        const filePath = join(PUBLIC_FOLDER_PATH, fileName)
        await fs.writeFile(filePath, file.buffer)
        return `http://localhost:3001/${fileName}`
    } catch (error) {
    console.log(error)
    throw error
}

}