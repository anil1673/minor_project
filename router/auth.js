const express=require("express");
const { registerUser ,loginUser, generateOtp, verifyOtp, saveChangePassword} = require("../controller/auth");
const { verifyUser, localVariables } = require("../middleware/authenticate");
const authRouter=express.Router();


authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
// url work when change pass button clicked
authRouter.get("/generateOtp",verifyUser,localVariables,generateOtp);

// url work when verify otp button clicked
authRouter.get("/verifyOtp",verifyUser,verifyOtp);
// url work when save password button clicked
authRouter.post("/saveChangePassword",verifyUser,saveChangePassword);



module.exports=authRouter