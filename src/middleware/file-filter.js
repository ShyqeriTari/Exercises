import { HttpError } from "http-errors"
import {extname} from "path"

const allowedExtensions = [".jpg, .png, .pdf"]
export const fileFilter = (req, res, next) => {
    const extension = extname(req.file.originalname)
if(allowedExtensions.some(allowedExtension => allowedExtension === extension.toLowerCase)){
    next()
} else{next(HttpError(400, `Extension is not allowed to upload, try with one of ${allowedextensions}`))}
}