import express from "express"
import { PUBLIC_FOLDER_PATH } from "./utils/fs-utils.js"
import { errorHandler } from "./utils/errorHandler.js"
import filesRouter from "./service/files/route.js"

const port = 3001

const server = express()

server.use(express.static(PUBLIC_FOLDER_PATH))

server.use(express.json())

server.use("/files", filesRouter)

server.use(errorHandler)

server.listen(port, () => {console.log(`✅ server is listening on port ${port}`)})

server.on("error", (error) => {
    console.log(`🔴 server crushed: ${error}`)
})