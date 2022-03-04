import { Router } from "express"
import multer from "multer"
import { fileFilter } from "../../middleware/file-filter.js"
import { PUBLIC_FOLDER_PATH, saveFile } from "../../utils/fs-utils.js"
import createHttpError from "http-errors"
import { v4 as uuid } from "uuid"
import { fileURLToPath } from "url"
import { join, dirname } from "path"
import fs from "fs-extra"

export const FILES_JSON_PATH = join(dirname(fileURLToPath(import.meta.url)), "files.json")

const getFileObjects = () => fs.readJSON(FILES_JSON_PATH)

const saveFileObject = async (fileObject) => {
    try {
        const fileObjects = await getFileObjects()
        fileObjects.push(fileObject)
        await fs.writeJSON(FILES_JSON_PATH, fileObjects)

    } catch (error) {
        console.log(error)
        throw error

    }
}


const filesRouter = Router()

filesRouter.post("/", multer().single("file"), fileFilter, async (req, res, next) => {
    try {
        const { url, filename } = await saveFile(req.file, true)
        const fileObject = {
            id: uuid(),
            originalName: req.file.originalname,
            url,
            filename,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await saveFileObject(fileObject)
        res.status(201).send({ fileObject })
    } catch (error) {
        next(createHttpError(500, "File is not uploaded"))
    }
})

filesRouter.get("/:fileName", async (req, res, next) => {
    try {
        const filePath = path.join(PUBLIC_FOLDER_PATH, req.params.fileName)
        const exists = await fs.pathExists(filePath)
        if (exists) {
            res.download(filePath)
        } else {
            next(createHttpError(404, ` ${req.params.fileName} is not found `))
        }
    } catch (error) {
        next(createHttpError(500, "Cant download file"))
    }
})

export default filesRouter