import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },
    
    name : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },

    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ]
}, {
    timestamps : true
})

const SubcategoryModel = mongoose.model('subCategory', subCategorySchema)

export default SubcategoryModel