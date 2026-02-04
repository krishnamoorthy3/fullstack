const User = require('../models/User');



const registerController=async(req,res)=>{
    try{
        const {username,email,password}=req.body;

        const user = {
            name:username,
            email,
            password
        }

        const newUser=new User(user);
        await newUser.save();

        return res.status(201).json({ message:"User registered successfully",user:newUser});

    }catch(err){
        console.log("Error in Register Controller",err);
        return res.status(500).json({message:"Internal Server Error"});
    }
};
