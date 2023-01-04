const jwt=require("jsonwebtoken");

const verifyUser=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];
        if(token){
            // verify user using token
            jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
                if(err){
                    // if loggedin user in not authorized
                    return res.status(400).json({
                        error:err,
                        message:"Authorization problem",
                        isLoggedIn:false
                    })
                }else{
                    // if loggedIn user is authorized user
                    if(req.params.userId === user._id){
                        req.user=user;
                        next();
                    }
                    else{
                        return res.status(401).json({
                            error:err,
                            message:"Authorization problem",
                            isLoggedIn:false
                        })
                    }                 
                }
            })
        }else{
            res.status(404).json({
                // if token is not present or authentication problem
                error:"authentication problem"
            })
        }
    
    }catch(error){
        next(error)
    }
}


const localVariables=(req,res,next)=>{
    req.app.locals={
        OTP:null,
        resetSession:false
    }
    next();
}


module.exports={verifyUser,localVariables}