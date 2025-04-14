import {Router} from "express";

import { addToCartController, deleteCartItemController, getCartItemController, updateCartItemController } from "../controllers/cart.controller.js";
import auth from "../middleware/auth.js";

const cartRouter = Router()

cartRouter.post("/create-cart",auth,addToCartController)
cartRouter.get('/get-cart',auth,getCartItemController)
cartRouter.put('/update-cart',auth,updateCartItemController)
cartRouter.delete('/delete-cart',auth,deleteCartItemController)

export default cartRouter
