const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const expressFileupload=require('express-fileupload');
const {recruiterRoute} =require('./routes/recruiterRoute')
const {seekerRoute}=require('./routes/seekerRoute')
const {AdminRoute}=require('./routes/AdminRoute')
const app=express(); 
app.use(express.json());
app.use(cors())
app.use("/upload",express.static("./uploads"));
//http://localhost:9000/upload/daya.jpg
app.use(expressFileupload())
const DbConnect=async()=>{ 
        const con=await mongoose.connect("mongodb://localhost:27017/recruitex");
        if(con){
            console.log("Connected to MongoDB...");
        }
} 
DbConnect();
 app.use("/api",AdminRoute);
 app.use("/api",recruiterRoute);
 app.use("/api",seekerRoute);


app.listen(9000,()=>{
    console.log("Server is Running at 9000 port")
})