const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:30,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    phone:{
        type:Number,
        required:true,
        unique:true

    },
    password:{
        type:String,
        min:8,
        required:true
    },
    position:{
        type:String,
        required:true
    }
},{timestamps:true})


const User=new mongoose.model("User",userSchema);

module.exports=User