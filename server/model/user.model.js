import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  
    name : {
        type : String,
        //enum : [''],
        required : [
            true,"Provide name"
        ]
    },
    email : {
        type : String,
        required : [true, "provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "provide password"]
    },
    avatar : {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        default : ""
    },
    refresh_token : {
        type : String,
        default : ""
    },
    verify_email : {
        type : Boolean,
        default : false
    },
    last_login_date : {
        type : Date,
        default : ""
    },
    status : {
        type : String,
        enum : ["Active","Inactive","Suspended"],
        default : "Active"
    },
    address_detail : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'address'
        }
    ],
    product_details  : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'product'
        }
    ],
    shopping_cart : [
        {
            type :mongoose.Schema.ObjectId,
            ref : 'cartProduct'
        }
    ],
    orderHistory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'order'
        }
    ],
    forgot_password_otp : {
        type : String,
        default : null
    },
    forgot_password_expiry : {
        type : Date,
        default : ""
    },
    role : {
        type : String,
        enum : ['ADMIN', 'USER', 'EMAIL'],
        default : "USER"
    }
},{
     timestamps : true
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel