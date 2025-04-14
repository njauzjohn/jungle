import {Router} from 'express'
import auth from '../middleware/auth.js'
import uploadImageController from '../controllers/uploadImages.controller.js'
import upload from '../middleware/multer.js'

const uploaderRouter = Router()

uploaderRouter.post("/upload",upload.single("image"),uploadImageController)

export default uploaderRouter