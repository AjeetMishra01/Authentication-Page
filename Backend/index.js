const express=require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const user=require("./models/user");

//For Connecting Mogoose
mongoose.connect("mongodb://127.0.0.1:27017/authentication")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

//Middleware
app.use(cors());
app.use(express.json());

//Login Route
app.post("/login",async (req,res)=>{
    const {email,password} =req.body;

    try{
        const existingUser =await user.findOne({email,password});

        if(existingUser){
            res.json({succes:true, message:"Login Successfull", user:{name:existingUser.name, email:existingUser.email}});
        }else{
            res.status(401).json({success:false, message:"Invalid Credentials"});
        }

    }catch(err){
        console.error(err);
        res.status(500).json({success:false, message:"Something went wrong"});
    }
});

//Register Route
app.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;

    try{
        const userExists = await user.findOne({email});

        if(userExists){
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }
        const newUser=new user({name,email,password});
        await newUser.save();

        res.json({success:true, message:"User registered succesfully"});

    }catch(err){
        console.error(err);
        res.status(500).json({success:true, message:"Something went wrong"});
    }    
});

//Listening
const port=3000;
app.listen(port,()=>{
    console.log("App listening at port "+port);
})