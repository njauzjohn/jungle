import {Router} from 'express'
import { UpdateProductByCategory, UpdateProductById, createLogoController, createProductController, deleteProductDetails, getLogo, getProductByCategory, getProductCategoryAndSubCategory, getProductController, getProductDetails, getProducts, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import auth from '../middleware/auth.js'

const productRouter = Router()

productRouter.post("/create",auth,createProductController)
productRouter.post("/createLogo",createLogoController)
productRouter.post("/get-logo",getLogo)
productRouter.post("/get-product",auth,getProductController)
productRouter.post("/product-category",auth,getProductByCategory)
productRouter.post("/updateHomeCategory",auth,UpdateProductByCategory)
productRouter.post("/updateProductById",auth,UpdateProductById)

productRouter.post("/product-subcategory-category",auth,getProductCategoryAndSubCategory)

productRouter.post("/getProductDetails",auth,getProductDetails)

productRouter.put('/updateProduct',auth,updateProductDetails)

productRouter.delete('/delete-product',auth,deleteProductDetails)

productRouter.post('/search-product',searchProduct)

productRouter.post('/products',getProducts)

//admin 4:54
export default productRouter


