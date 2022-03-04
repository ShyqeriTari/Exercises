import express from "express"
import { PUBLIC_FOLDER_PATH } from "./utils/fs-utils"


const port = 3001

const server = express()

server.use(express.static(PUBLIC_FOLDER_PATH))

server.use(express.json())

server.listen(port, () => {console.log(`server is listening on port ${port}`)})

server.on("error", () => {
    console.log(`server crushed: ${error}`)
})