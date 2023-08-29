const mongoose=require("mongoose");

const messageSchema=mongoose.Schema({
    name:String,
    email:String,
    number:String,
    message:String,
    time:{type:Date,default:Date.now()}
})

const Messagemodel=mongoose.model("message",messageSchema);

module.exports={
    Messagemodel
}