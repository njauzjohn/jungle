import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },

    oderId : {
        type : String,
        required : [true, "Provide orderId"],
        unique : true
    },
    productId : {
        type : mongoose.Schema.ObjectId,
        ref : "product"
    },
    product_details : {
        name : String,
        image : Array
    },
    paymentId : {
        type : string,
        default : ""
    },
    payment_status : {
        type : String,
        default : ""
    },
    delivery_address : {
        type : mongoose.Schema.ObjectId,
        ref : 'address'
    },
    subTotalAmt : {
        type : Number,
        default : null
    },
    totalAmt : {
        type : Number,
        default : null
    },
    invoice_receipt : {
        type : String,
        default : ""
    }
}, {
    timestamps : true
})

const orderModel = mongoose.model('order',orderSchema)

export default orderModel