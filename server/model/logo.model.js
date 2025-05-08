import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({

name : {
    type : String,
    default : ""
},

image : {
    type : Array,
    default : []
},

})

const logoModel = mongoose.model('logo',logoSchema )

export default logoModel