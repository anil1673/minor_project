const mongoose=require("mongoose");

const busSchema=new mongoose.Schema({
    busName:{
        type:String,
        required:true
    },
    busNumber:{
        type:String,
        unique:true,
        required:true
        
    },
    capacity:{
        type:Number,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    travelDate:{
        type:Date,
        default:new Date()
    },
    timeFrom:{
        type:String,
        // required:true,

    },
    timeTo:{
        type:String,
        // required:true
    },
    busType:{
        type:String,
        default:"Non AC"
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"Yet To Start",  
    },
    busOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})


const Bus=new mongoose.model("Bus",busSchema);

module.exports=Bus