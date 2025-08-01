const express=require("express");
const app=express();
const cors=require("cors");
const port=3000;
const fs=require("fs");

//Middleware
app.use(cors());
app.use(express.json());

const getUsers = () => {
  const data = fs.readFileSync("./users.json", "utf8"); 
  return JSON.parse(data);
};
const saveUsers = (users) => {
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2), "utf8");
};

app.post("/login",(req,res)=>{
    const {email,password} =req.body;
    const users=getUsers();
    const user=users.find(u=>u.email===email && u.password===password);

    if(user){
        res.json({succes:true, message:"Login Successfull", user:{name:user.name, email:user.email}});
    }else{
        res.status(401).json({success:false, message:"Invalid Credentials"});
    }
});

app.post("/register",(req,res)=>{
    const {name,email,password}=req.body;
    const users=getUsers();

    const userExists = users.some(u => u.email === email);

    if(userExists){
        return res.status(400).json({ success: false, message: "User Already Exists" });
    }else{
        users.push({name,email,password});
        saveUsers(users);
        res.json({success:true, message:"User Registered Successfully"});
    }
});




app.listen(port,()=>{
    console.log("App listening at port "+port);
})