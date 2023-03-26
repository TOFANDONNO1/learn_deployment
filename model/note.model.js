const mongoose=require('mongoose');

//user Schema
const noteSchema = mongoose.Schema({
    title:String,
    body:String,
   sub:String,
   userID:String
},{
    versionKey:false
})


const noteModel = mongoose.model("user",noteSchema)

module.exports={
    noteModel
}