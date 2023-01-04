const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});
const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser=require("cookie-parser");
const authRouter=require("./router/auth");
const busRouter = require("./router/bus");
require("./db/conn")

app.use(cookieParser());
app.use(cors());
app.use(express.json());


app.use("/api/auth",authRouter);
app.use("/api/bus",busRouter);







app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const errorMessage=err.Message||"something went wrong";

    return res.status(errorStatus).json(({
        status:errorStatus,
        stack:err.stack,
        message:errorMessage,
        success:false
    }))

});


app.listen(5000,(req,res,)=>{
    console.log("express connection success");
})