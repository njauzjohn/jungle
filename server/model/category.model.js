import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    
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
    }
}, {
    timestamps : true
})

const categoryModel = mongoose.model('category', categorySchema)

export default categoryModel