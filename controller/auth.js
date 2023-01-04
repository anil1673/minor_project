const User = require("../models/user");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken")
const otpGenerator=require("otp-generator");
const { localVariables } = require("../middleware/authenticate");
const nodemailer=require("nodemailer");
const { transporter } = require("../email/emailConfig");

const registerUser=async(req,res,next)=>{
    try{
        const {name,email,phone,position,password}=req.body;

        const hashPass=await bcryptjs.hash(password,10);

        const isEmailAvailable=await User.findOne({email})
        if(isEmailAvailable){
            res.status(403).json({
                error:"email already available"
            })
        }else{
            const newUser=new User({
                name,email,phone,position,password:hashPass
            });

            await newUser.save().then((registeredUser)=>{
                res.status(200).json({
                    message:"registration success",
                    user:registeredUser
                })
            }).catch((error)=>{
                res.status(200).json({
                    error:error,
                })
            })
        }

    }catch(error){
        next(error)
    }
}



// login user

const loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;

        const isEmailAvailable=await User.findOne({email}).then(async(user)=>{
             bcryptjs.compare(password,user.password,(err,result)=>{
                if(result){
                    // generate token
                    jwt.sign({_id:user._id},process.env.SECRET_KEY,(err,token)=>{
                        if(err)res.status(400).json({error:err});
                        res.status(200).json({
                            message:"login success",
                            token:"Bearer " + token
                        })
                    })
                    
                }else{
                    res.status(400).json({error:err})
                }
            })

        }).catch((error)=>{
            res.status(401).json({
                error:"email not found",
            })
        })

    }catch(error){
        next(error)
    }
}


// generate OTP 
// otp is generated when someone click on change  password
const generateOtp=async(req,res,next)=>{
    
    
    req.app.locals.OTP=await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
    await User.findById(req.user).then(async(user)=>{
        await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:user.email,
            subject:"Change Password",
            html:`<h3>Password Change OTP is <h2> ${req.app.locals.OTP} </h2> </h3>`
        })
    })
    res.status(200).json({
        OTP:req.app.locals.OTP
    })

}
// verify OTP
// this work when user type otp and click verify Otp button
const verifyOtp=async(req,res,next)=>{
    const {otp}=req.query;
    console.log(parseInt(req.app.locals.OTP)," ",parseInt(otp))
    if(parseInt(req.app.locals.OTP)==parseInt(otp)){
        req.app.locals.OTP=null;
        req.app.locals.resetSession=true;
        res.status(200).json({
            message:"otp verification success"
        })
    }else{
        res.status(400).json({
            error:"Invalid Otp"
        })
    }
    
}

// forget password  button
const saveChangePassword=async(req,res,next)=>{
    try{
        if(req.app.locals.resetSession){
        const {password}=req.body;
        
        const isEmailAvailable=await User.findById(req.user._id).then(async(user)=>{
            const hashPass=await bcryptjs.hash(password,10);
            
            await User.findByIdAndUpdate(user._id,{$set:{password:hashPass}},{new:true}).then((user)=>{
                req.app.locals.resetSession=false;
                res.status(200).json({
                    message:"password changed successfully"
                });

            }).catch((error)=>{
                res.status(200).json({
                    error:error
                })
            })
            
            
        }).catch((error)=>{
            res.status(404).json({
                error:error
            })
        })
    }else{
        res.status(401).json({
            error:"reset session is still false"
        })
    }
    }catch(error){
        next(error)
    }
}


module.exports={
    registerUser,
    loginUser,
    generateOtp,
    verifyOtp,
    saveChangePassword
}