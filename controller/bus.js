const Bus=require("../models/bus");
const User=require("../models/user")


// admin -add bus
const addBusController=async(req,res,next)=>{
    try{
        const busOwner=await User.findById(req.user);
        const {busName,busNumber,capacity,from,to,travelDate,timeFrom,timeTo,busType,fare,status}=req.body;
        
         const newBus=new Bus({
            busName:busName.toLowerCase(),
            busNumber,
            capacity,
            from:from.toLowerCase(),
            to:to.toLowerCase(),
            travelDate,
            timeFrom,
            timeTo,
            busType,
            fare,
            status,
            busOwner:busOwner
        });
        
        await newBus.save().then(async(b)=>{
            res.status(200).json({
                message:"bus added successfully",
                bus:b
            })
        }).catch((error)=>{
            res.status(401).json({
                error:error
            })
        });
    }catch(error){
        console.log(error)
        next(error);
    }
}


//user- fetch all bus
const getAllAdminBusController=async(req,res,next)=>{
    try{
        const {userId}=req.params;
        console.log(userId)
        const bus=await Bus.find({busOwner:userId}).populate("busOwner");
        res.status(200).json(bus)
    }catch(error){
        next(error)
    }
}

// admin- Fetch all bus
const getAllBusController=async(req,res,next)=>{
    try{
        const bus=await Bus.find().populate("busOwner");
        res.status(200).json(bus)

    }catch(error){
        next(error)
    }
}

// edit bus
const editBusController=async(req,res,next)=>{
    try{
        const {busName,busNumber,capacity,from,to,travelDate,timeFrom,timeTo,busType,fare,status}=req.body;
        await Bus.findByIdAndUpdate(req.params.id,{$set:{busName,busNumber,capacity,from,to,busType,fare,status}},{new:true}).then((bus)=>{
            res.status(200).json({
                message:"bus updated successfully",
                bus:bus
            })
        }).catch((error)=>{
            console.log(error)
            res.status(400).json({
                error:error
            })
        })
    }catch(error){
        next(error)
    }
}

// fetch single bus
const getSingleBusController=async(req,res,next)=>{
    try{
        const bus=await Bus.findById({_id:req.params.busid}).populate("busOwner");
        res.status(200).json(bus)

    }catch(error){
        next(error)
    }
}

// delete bus route
const delBusController=async(req,res,next)=>{
    try{
        const findBus=await Bus.findByIdAndDelete({_id:req.params.id});
        const bus=await Bus.find();
        res.status(200).json(bus)
        
    }catch(error){
        next(error)
    }
}


// search bus 
const searchBusController=async(req,res,next)=>{
    try{
        let b;
        
        // if(req.query.from==="" && req.query.to===""){
        //     b=await Bus.find();

        // }else if(req.query.from.toLowerCase()===""){
        //     b=await Bus.find({to:req.query.to});
            
        // }else if(req.query.to.toLowerCase()===""){
        //     b=await Bus.find({from:req.query.from});
        // }else{
        //     b=await Bus.find({from:req.query.from.toLowerCase(),to:req.query.to.toLowerCase()});
        // }
        
        if(req.query.date==="" && req.query.from==="" && req.query.to===""){
            b=await Bus.find().populate("busOwner");
        }else if(req.query.from==="" && req.query.to===""){
            b=await Bus.find({date:req.query.date}).populate("busOwner");
        }else if(req.query.from==="" && req.query.date===""){
            b=await Bus.find({to:req.query.to.toLowerCase()}).populate("busOwner");
        }else if(req.query.date==="" && req.query.to===""){
            b=await Bus.find({from:req.query.from.toLowerCase()}).populate("busOwner");
        }else if(req.query.from===""){
            b=await Bus.find({to:req.query.to.toLowerCase(),date:req.query.date}).populate("busOwner");
        }else if(req.query.to===""){
            b=await Bus.find({from:req.query.from.toLowerCase(),date:req.query.date}).populate("busOwner");
        }else if(req.query.date===""){
            b=await Bus.find({from:req.query.from.toLowerCase(),to:req.query.to.toLowerCase()}).populate("busOwner");
        }

        res.status(200).json(b)

    }catch(error){
        next(error)
    }
}

module.exports={
    addBusController,
    getAllBusController,
    getAllAdminBusController,
    delBusController,
    searchBusController,
    getSingleBusController,
    editBusController,
    }