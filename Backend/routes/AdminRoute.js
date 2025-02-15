const express=require("express")
const AdminRoute=express.Router()
const {AdminTable} =require('../models/AdminModel');
const {seekerTable}=require('../models/seekerModel');
const {recruiterTable}=require('../models/recruiterModel');
AdminRoute.post("/Admin-register",async(req,res)=>{
  const {name,email,contact,password,location} =req.body;
  let img=req.files.img;
    img.mv("uploads/"+img.name,(err)=>{
        if(err){
            res.send(err)
        }
    })
   const data=  new AdminTable({name: name,img:img.name,email:email,contact:contact,password:password,location:location})
   const result= await data.save()
       res.json({
        code :200,
        data:result
       })
})



AdminRoute.post("/Admin-login", async (req, res) => {
const {email,password}=req.body


      const result = await AdminTable.findOne({email,password}); 
      if(result) {
      res.json({
        code: 200,
        message: "Login Successfull !...",
        data:result
      });
    } else {
      res.json({
        code: 404,
        message: "Invalid Email or Password"
    
      });
    }
  });

AdminRoute.get("/admin-seekerlist",async(req,res)=>{
   try{
    const result= await seekerTable.find();
    res.json({
      code:200,
      message:"Data found Successfull",
      data:result
    })

   } catch(err){
    console.log(err)
   }
})  

AdminRoute.get("/admin-recruiterlist",async(req,res)=>{
  try{
   const result= await recruiterTable.find();
   res.json({
     code:200,
     message:"Data found Successfull",
     data:result
   })

  } catch(err){
   console.log(err)
  }
}) 

AdminRoute.put("/admin-update/:_id",async(req,res)=>{
  const _id=req.params._id;
  const {name,email,contact,password,location}=req.body;
  let img=req.files.img;
  img.mv("uploads/"+img.name,(err)=>{
    if(err){
        res.send(err)
    }
})
  

const result=await AdminTable.findByIdAndUpdate({_id:_id},{
       $set:{name,email,contact,password,location,img:img.name}},
      {new:true}
)
 res.json({
  code:200,
  message:"Data updated Successfull",
  data:result

 })

})

AdminRoute.put("/admin-seekerblock/:_id",async(req,res)=>{
      const _id=req.params._id;
      const status=req.body.status;
      const result=await seekerTable.findByIdAndUpdate({_id:_id},{
        $set:{isBlock:status}},{new:true})
      res.json({
        code:200,
        message:"Data updated Successfull",
        data:result
      })
})
AdminRoute.put("/admin-recruiterblock/:_id",async(req,res)=>{
  const _id=req.params._id;
  const status=req.body.status;
  const result=await recruiterTable.findByIdAndUpdate({_id:_id},{
    $set:{isBlock:status}},{new:true})
  res.json({
    code:200,
    message:"Data updated Successfull",
    data:result
  })
})

 module.exports={AdminRoute}