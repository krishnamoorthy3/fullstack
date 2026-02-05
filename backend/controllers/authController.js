const User = require('../modules/User');
const VerifiedEmail= require("../modules/VerifiedEmail")
const {hashPassword}= require("../utils/bcryptPassword")
const {createAccessToken,attach_RefreshToken}= require("../utils/jwtTokens")
const registerController=async(req,res)=>{
    try{
        const {name,email,password}=req.body;


        const hash_psw=await hashPassword(password)
        const user = {
            name,
            email,
            password:hash_psw
        }

        const createUser = await User.create(user)

        const newUser={name,email,_id:createUser._id};

        const accessToken= createAccessToken(user);

        attach_RefreshToken(user,res)

        await VerifiedEmail.deleteOne({email});
        
        return res.status(201).json({success:true, message:"User registered successfully",user:newUser,accessToken});

    }catch(err){
        console.log("Error in Register Controller",err);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

const loginController=async(req,res)=>{
    try{
        const {  email } = req.body; 

        const existingUser = await User.findOne({ email });

        const user={
            name:existingUser.name,
            email,
            _id:existingUser._id
        }

        const accessToken= createAccessToken(user);

        attach_RefreshToken(user,res)

        return res.status(200).json({success:true, message:"User logedin successfully",user,accessToken});
    }catch(err){
        console.log("Error in login Controller",err);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

const refreshController=async(req,res)=>{
    try{
        const user = req.user

        const accessToken= createAccessToken(user);

        attach_RefreshToken(user,res)

        return res.status(200).json({success:true, message:"Fetched User successfully",user,accessToken});
    }catch(err){
        console.log("Error in refresh Controller",err);
        return res.status(500).json({success:false,message:`Internal Server Error ${err}`});
    }
}

module.exports={registerController,loginController,refreshController};