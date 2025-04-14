import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line : {
        type : String,
        default : ""
    },

    city : {
        type : string,
        default : ""
    },

    state : {
        type : String,
        default : ""
    },

    pincode : {
        type : String,
        default : ""
    },

    country : {
        type : String,
        default : ""
    },

    county : {
        type : String,
        default : ""
    },

    town : {
        type : String,
        default : ""
    },

    mobile : {
        type : Number,
        default : null
    },
    status : {
        type : Boolean,
        default : true
    }
    
}, {
    timestamps : true
})

const AddressModel = mongoose.model('address', addressSchema)

export default AddressModel