import { Router} from 'express'
import auth from '../middleware/auth.js'
import { AddCategoryController, deleteController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js'
const categoryRouter = Router()

categoryRouter.post("/add-category", AddCategoryController)
categoryRouter.get("/get",getCategoryController)
categoryRouter.put("/update",updateCategoryController)
categoryRouter.delete("/delete",deleteController)


export default categoryRouter