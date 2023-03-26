const express=require("express");
const { noteModel } = require("../model/note.model");
const noteRouter=express.Router();
const jwt = require("jsonwebtoken");
noteRouter.get("/",async(req,res)=>{
    const token =req.headers.authorization.split("")[1]
const decoded=jwt.verify(token,"masai")
try {
    if(decoded){
        const notes=await noteModel.find({"userID":decoded.userID})
        res.status(200).send(notes);
    }
   
} catch (error) {
    res.status(400).send({"msg":error.message})
}
})

noteRouter.post("/add",async(req,res)=>{

try {
    const note=new noteModel(req.body)
    await note.save();
    res.status(200).send({"msg":"A new Note has been created"})
} catch (error) {
res.status(400).send({"msg":error.message})    
}
})


noteRouter.patch("/update/:noteID",async(req,res)=>{
    const payload = req.body
    const noteID=req.params.noteID
    try {
        await noteModel.findByIdAndUpdate({_id:noteID},payload)
    res.status(200).send({"msg":"Note updated successfully"})
    } catch (error) {
res.status(400).send({"msg":error.message})         
    }
})


noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const payload = req.body
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.decoded.userID
    const req_id=decoded.userID //The person who use making the delete request
    const note=noteModel.findOne({_id:noteID})
const userID_in_note=note.userID
    const noteID=req.params.noteID
    try {
        if(req_id===userID_in_note){

            await noteModel.findByIdAndDelete({_id:noteID})
            res.status(200).send({"msg":"Note deleted successfully"})
        }else{
        res.status(400).send({"msg":"NOt Authorised"})
            
        }
    } catch (error) {
        res.status(400).send({"msg":"Error deleting"})
    }
})

module.exports={
    noteRouter
}