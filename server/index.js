import express, { request, response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookiesParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './router/user.router.js'
import categoryRouter from './router/category.route.js'
import uploaderRouter from './router/upload.route.js'
import subCategoryRouter from './router/subCategory.route.js'
import productRouter from './router/product.route.js'
import cartRouter from './router/cart.route.js'

const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
    //origin : '/*'
}))
app.use(express.json())
app.use(cookiesParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))
const PORT = 5000|| process.env.PORT

app.get("/", (request, response)=>{
    response.json({
        message : "Server is running" + PORT
    })
})

app.use("/api/user", userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/file",uploaderRouter)
app.use("/api/subcategory", subCategoryRouter)
app.use("/api/product/", productRouter)
app.use("/api/cart", cartRouter)



connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is running", PORT)
    })
})
