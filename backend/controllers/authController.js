const User = require('../modules/User');
const VerifiedEmail= require("../modules/VerifiedEmail")


const registerController=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        const user = {
            name,
            email,
            password
        }

        const newUser=new User(user);
        await newUser.save();

        await VerifiedEmail.deleteOne({email});
        
        return res.status(201).json({ message:"User registered successfully",user:newUser});

    }catch(err){
        console.log("Error in Register Controller",err);
        return res.status(500).json({message:"Internal Server Error"});
    }
};



module.exports={registerController};