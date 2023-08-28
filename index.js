const express =require("express");
require("dotenv").config();
const cors=require("cors");
const app=express();

const{Connection}=require("./config/db");
const{Messagemodel}=require("./models/message.model");

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Basic API endpoint for Message recieving backend");
})

app.post("/message",async(req,res)=>{
    const{name,email,number,message}=req.body;
    try {
        if(req.body){
            const Message=new Messagemodel({name,email,number,message});
            await Message.save();
            res.status(201).json({"msg":"Thank you for reaching out to us."});
        }else{
            res.status(400).json({"msg":"Unable to reach"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"msg":"Unable to reach"});
    }
})

app.get("/message",async(req,res)=>{
    const messages=await Messagemodel.find();
    res.status(200).json({"msg":"messages fetched successfully","data":messages});
})

app.listen(process.env.port,async()=>{
    try {
        await Connection;
        console.log("Connected to DataBase");
        console.log(`server is running at http://localhost:${process.env.port}`);
    } catch (error) {
        console.log(error.message);
        console.log("Unable to connect to DataBase");
    }
})


