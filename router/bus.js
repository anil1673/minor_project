const express=require("express");
const { 
    addBusController,
    getAllAdminBusController,
    getAllBusController,
    delBusController,
    searchBusController,
    getSingleBusController,
    editBusController,
    } = require("../controller/bus");
const { verifyUser, localVariables } = require("../middleware/authenticate");
const busRouter=express.Router();

//admin- add bus
busRouter.post("/addBus/:userId",verifyUser,addBusController);
//admin- delete bsu
busRouter.delete("/deleteBus/:userId/:id",verifyUser,delBusController)
//admin- edit bus
busRouter.put("/editBus/:userId/:id",verifyUser,editBusController)
// admin-fetch all bus
busRouter.get("/adminAllBus/:userId",verifyUser,getAllAdminBusController)


//user- fetch all bus
busRouter.get("/userAllBus/:userId",verifyUser,getAllBusController);
//user- search bus
busRouter.get("/searchBus/:userId",verifyUser,searchBusController);
// user- search bus





module.exports=busRouter;