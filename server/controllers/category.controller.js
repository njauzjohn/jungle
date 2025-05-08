import categoryModel from "../model/category.model.js"
import SubcategoryModel from "../model/subcategory.model.js"
import productModel from "../model/product.model.js"

export const AddCategoryController = async(request,response)=>{
    try {
        const {name,image} = request.body
        
        if(!name || !image){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const addCategory = new categoryModel({
            
            name,
            image
        })

        const saveCategory = await addCategory.save()

        if(!saveCategory){
            return response.status(400).json({
                message : "Not created",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Category Added",
            data : saveCategory,
            success : true,
            error : false
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getCategoryController = async(request,response)=>{
    try {
        //const userId = request.userId
        //{_id : userId}
        const data = await categoryModel.find().sort({createdAt : 1})

        return response.json({
            data : data,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCategoryController = async(request,response)=>{
    try {
        const {_id,name,image}=request.body

        const update = await categoryModel.updateOne({
            _id : _id
        },{
            name,
            image
        }) 

        return response.json({
            message : "Category Updated",
            success : true,
            error : false,
            data : update
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


export const deleteController = async(request,response)=>{
    try {
        const {_id}=request.body

        const checkSubCategory = await SubcategoryModel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()

        const checkProduct = await productModel.find({
            category : {
                "$in" : [_id]
            }
        }).countDocuments()

        if(checkSubCategory > 0 || checkProduct > 0){
            return response.status(400).json({
                message : "Cannot delete product category in use",
                error : true,
                success : false
            })
        }

        const deleteCategory = await categoryModel.deleteOne({_id : _id})

        return response.json({
            message : "Category deleted successfully",
            error : false,
            success : true,
            data : deleteCategory
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            success : false,
            error : true
        })
    }
}