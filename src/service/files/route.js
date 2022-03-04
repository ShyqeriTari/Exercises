import {Router} from "express"
import multer from "multer"
import { fileFilter } from "../../middleware/file-filter.js"
import createHttpError from "http-errors"


const filesRouter = Router()

filesRouter.post("/", multer().single("file"), fileFilter, async (req, res, next) => {
    try {
        const url = await SVGComponentTransferFunctionElement(req.file, true)
        res.send({url})
    } catch (error) {
       next(createHttpError(500, "File is not uploaded"))
    }
})

export default filesRouter