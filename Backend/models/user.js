const mongoose=require("mongoose");

//Defining the registered user schema
const userSchema=new mongoose.Schema({
    name:String,
    email:{type:String, unique:true},
    password:String,
});

module.exports=mongoose.model("user",userSchema);