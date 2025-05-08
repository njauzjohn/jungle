import productModel from '../model/product.model.js'
import ProductModel from '../model/product.model.js'
import auth from '../middleware/auth.js'
import UserModel from '../model/user.model.js'
import { Error } from 'mongoose'
import logoModel from '../model/logo.model.js'



export const createLogoController = async (request, response) => {

    try {

        const {


            name,
            image,
        } = request.body

        const product = new logoModel ({

            name,
            image,
        })

        const saveProduct = await product.save()

        return response.json({
            message: "Logo saved successfully",
            data: saveProduct,
            error: false,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}

export const createProductController = async (request, response) => {
    const userId = request.userId
    const productId = request.body

    try {

        const checkItem = await ProductModel.findOne({
            userId: userId,
            product_details: productId,

        })

        if (!productId) {
            return response.status(400).json({
                message: "Provide productId",
                error: true,
                success: false
            })
        }

        const {


            name,
            image,
            category,
            subcategory,
            //userId,
            unit,
            stock,
            price,
            discount,
            description,
            product_details,
            more_details,
            beds,
            ShopName
        } = request.body

        if (!name || !image[0] || !category[0] || !subcategory[0] || !unit || !price || !description) {
            return response.status(400).json({
                message: "Enter required fields",
                error: true,
                success: false
            })
        }

        const product = new ProductModel({

            name,
            image,
            category,
            subcategory,
            unit,
            userId,
            stock,
            price,
            discount,
            description,
            product_details,
            more_details,
            beds,
            ShopName
        })

        const saveProduct = await product.save()

        // const updateProductUser = await UserModel.updateOne({_id : userId},
        //     {
        //         $push : {
        //             productId : productId
        //         }
        //     }
        // )
        return response.json({
            message: "Product saved successfully",
            data: saveProduct,
            error: false,
            success: true
        })

    } catch (error) {
        console.log(error)


        // return response.status(500).json({
        //     message : "Product no saved",
        //     error : true,
        //     success : false
        // })
    }
}



export const getProductController = async (request, response) => {


    try {
        let { page, limit, search } = request.body
        const _id = request.userId
        const userId = request.userId
        if (!page) {
            page = 2
        }

        // if(!limit){
        //     limit=10
        // }


        const query = search ? {
            $text: {
                $search: search
            }
        } : {}
        const skip = (page - 1) * limit

        //  let _id = request.body
        //const {_id}=request.body
        const checkProductCategory = await ProductModel.find({
            userId: {
                "$in": [_id]
            }
        }).countDocuments()

        const checkuser = await ProductModel.find({
            userId: {
                "$in": [userId]
            }
        }).countDocuments()

        console.log("user", checkuser)

        const [data, totalCount] = await Promise.all([
            // ProductModel.findById(),
            ProductModel.find({ userId: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)

        ])

        // const user = await ProductModel.findById(_id)

        // const {data : responseData} = user
        //  console.log("user",user)
        return response.json({
            message: "product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data: data
        })

    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductByCategory = async (request, response) => {
    try {
        const { id } = request.body
        const userId = request.userId

        if (!id) {
            return response.status(400)({
                message: "provide category id",
                error: true,
                success: false
            })
        }

        // const product = await ProductModel.find({
        //     category : {$in : id}
        // }).limit(10)

        // const product = await ProductModel.find({
        //          category : {$in : id},
        //         userId : userId
        //  }).populate('userId')


        const product = await ProductModel.find({
            category: { $in: id },

        }).populate('productId')

        return response.json({
            message: "category product list",
            error: false,
            success: true,
            data: product
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

        // console.log(error)
    }
}



export const UpdateProductByCategory = async (request, response) => {
    try {
        const { id } = request.body
        const { name, avatar } = request.userId

        if (!id) {
            return response.status(400)({
                message: "provide category id",
                error: true,
                success: false
            })
        }

        // const product = await ProductModel.find({
        //     category : {$in : id}
        // }).limit(10)

        // const product = await ProductModel.updateOne({
        //          category : {$in : id},
        //         userId : userId
        //  }).populate('userId')

        const updateProduct = await ProductModel.find({
            category: { $in: id },

        }).sort({ createdAt: -1 })

        return response.json({
            message: "category product list",
            error: false,
            success: true,
            data: updateProduct
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

        // console.log(error)
    }
}


export const UpdateProductById = async (request, response) => {
    try {
        const { id } = request.body
        const userId = request.userId
        //

        if (!id) {
            return response.status(400)({
                message: "provide category id",
                error: true,
                success: false
            })
        }


        const product = await UserModel.find({
            avatar: { $in: id }
        })






        console.log("avatar", data)


        return response.json({
            message: "Prof",
            error: false,
            success: true,
            data: product
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

        // console.log(error)
    }
}



export const getProductCategoryAndSubCategory = async (request, response) => {
    try {
        const { categoryId, subCategoryId, page, limit } = request.body

        if (!categoryId || !subCategoryId) {
            return response.status(400).json({
                message: "Provide SubCategoryId & CategoryId",
                error: true,
                success: false
            })
        }

        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }
        const query = {
            category: { $in: categoryId },
            subCategory: { $in: subCategoryId }

        }

        const skip = (page - 1) * limit

        const [data, dataCount] = await new Promise([
            ProductModel.find(query).sort({ createdAt: - 1 }).skip(skip).limit(limit),
            productModel.countDocuments(query)
        ])

        return response.json({
            message: "List Products",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
            success: true,
            error: false
        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProductDetails = async (request, response) => {
    try {
        const { productId } = request.body

        const product = await ProductModel.findOne({ _id: productId })

        return response.json({
            message: "Product details",
            data: product,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateProductDetails = async (request, response) => {
    try {
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide product _id",
                error: true,
                success: false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id: _id }, {
            ...request.body
        })

        return response.json({
            message: "update successfully",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteProductDetails = async (request, response) => {
    try {
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({ _id: _id })

        return response.json({
            message: "Product deleted successfully",
            error: false,
            success: true,
            data: deleteProduct
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const searchProduct = async (request, response) => {
    try {
        let { search, page, limit } = request.body

        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }

        const query = search ? {
            $text: {
                $search: search
            }
        } : {}

        const skip = (page - 1) * limit

        const { data, dataCount } = await Promise.all([
            ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate(`category`),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message: "Product data",
            error: false,
            success: true,
            data: data,
            totalCount: dataCount,
            totalPage: Math.ceil(dataCount / limit),
            page: page,
            limit: limit
        })
        console.log("product", data)

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getProducts = async (request, response) => {

    try {
        const userId = request.userId
        const _id = request.body

        const product = await ProductModel.find({
            userId: userId,

        }).populate('productId')

        console.log("p", product)

        return response.json({
            message: "product data",
            data: product,
            error: false,
            success: true,

        })



        //     // return response.json({
        //     //     data : product,
        //     //     error : false,
        //     //     success : true
        //     // })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}

export const getLogo = async (request, response) => {

    try {
        // const userId = request.userId
        // const _id = request.body

        const product = await logoModel.find()

        console.log("p", product)

        return response.json({
            message: "product data",
            data: product,
            error: false,
            success: true,

        })



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}