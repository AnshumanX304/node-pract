const express=require('express');
const app=express();
const dbconnection = require("./dbconnect/dbconnection");
dbconnection();
const cors = require('cors');
app.use(cors());
const UserModel=require("./Models/useModel");
app.use(express.json());
const bcrypt = require("bcrypt");

app.post('/signup',async (req,res)=>{
    try{
        const {username,email,password}=req.body;
        const passwordHash = await bcrypt.hash(password, 12);
        const user = UserModel({
            username,
            email,   
            password:passwordHash
        });
        user.save();
        res.status(200).json({
        success: true,
        msg: "user registered !",
        });
    }
    catch(err){
        console.log(err);
    }
})

app.post("/signin",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await UserModel.findOne({ email });
        user.updateOne({ email: email })
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.error(err);
        });
        // const currdate=new Date();

        if (!user) throw new Error("No user found!");
        const result = await bcrypt.compare(password, user.password);
        if (!result) throw new Error("Invalid credentials!");
        res.status(200).json({
            success: true,
            msg: "Login successful",
            id:user._id
          });



    }
    catch(err){
        res.status(400).json({ success: false, msg: err.message });
        console.log(err);
       
    }

})
app.get("/getcount",async (req,res)=>{
    try{
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
    
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
    
        const users = await UserModel.find({
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        });
        const number=users.length;
        res.status(200).json({
            success: true,
            msg: "Login successful",
            number
            
          });
    

    }
    catch(err){
        console.log(err);
    }
})
app.listen(3500,()=>{
    console.log("server started !");
})