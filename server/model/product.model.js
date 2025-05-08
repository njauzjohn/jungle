import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    
   
    name : {
        type : String,
        default : ""
    },

    image : {
        type : Array,
        default : []
    },
    userId : [ {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
    ],

    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
     
    subcategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'subcategory'
        }
    ],

    unit : { 
        type : String,
        default : null
    },

    stock : {
        type : Number,
        default : 0
    },

    price : {
        type : Number,
        default : null
    },

    discount : {
        type : Number,
        default : null
    },

    description : {
        type : String,
        default : ""
    },

    more_details : {
        type : Object,
        default : {}
    },

    publish : {
        type : Boolean,
        default : true
    }, 
    ShopName :{
        type : String,
        default : ""
    },
    beds :{
        type : String,
        default : ""
    }
},{
    timestamps : true
})

productSchema.index({
    name : "text",
    description : 'text'
},{
    name : 10,
    description : 5
})

const productModel = mongoose.model('product',productSchema )

export default productModel