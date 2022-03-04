import { Router } from "express"
import multer from "multer"
import { fileFilter } from "../../middleware/file-filter.js"
import { saveFile } from "../../utils/fs-utils.js"
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
        const url = await saveFile(req.file, true)
        const fileObject = {
            id: uuid(),
            originalName: req.file.originalname,
            url,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        await saveFileObject(fileObject)
        res.status(201).send({ fileObject })
    } catch (error) {
        next(createHttpError(500, "File is not uploaded"))
    }
})

export default filesRouter