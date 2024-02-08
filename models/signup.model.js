const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    emailID:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type : String,
        required : true
    }
},{timestamps:true})

module.exports = mongoose.model("SignUpModel",userSchema)