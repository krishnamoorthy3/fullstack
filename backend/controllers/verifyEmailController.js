const {generateOtp} = require('../utils/generateOtp');
const {sendEmail} = require('../utils/mails/otpVerification');
const VerifiedEmail= require("../modules/VerifiedEmail")
const Otp= require('../modules/otpModel');

const sendVerificationEmail=async(req,res)=>{
    try {

        const {email}= req.body;
        
        const otp= generateOtp();
        
        const newOtp= new Otp({
            email,
            otp,
            createdAt: Date.now(),
            expiresAt: Date.now()+ parseInt(process.env.otp_expiry_minutes)*60*1000 //10 minutes
        });
        
        await newOtp.save();
        
        await sendEmail(email, otp);

        res.status(200).json({
            success:true,
            message:"Verification email sent successfully",
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error verifying email",
            error:error.message
        })
    }
}

const verifyOtp=async(req,res)=>{
    try{
        const {email, otp}= req.body;

        const record= await Otp.findOne({email, otp});

        if(!record){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP or Email"
            });
        }
        if(record.expiresAt < Date.now()){
            await deleteOtp(email);
            return res.status(400).json({
                success:false,
                message:"OTP has expired"
            });
        }

        await deleteOtp(email);

        await VerifiedEmail.create({email})

        res.status(200).json({
            success:true,
            message:"OTP verified successfully"
        });

    } catch(err){

        
        res.status(500).json({
            success:false,
            message:"Error verifying OTP",
            error:err.message
        })
    }
}


const deleteOtp=async(email)=>{
    try{
        await Otp.deleteOne({email});
    }catch(err){
        console.log("Error deleting OTP record:", err.message);
    }
}

module.exports={sendVerificationEmail, verifyOtp,deleteOtp};