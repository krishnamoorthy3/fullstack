const User=require("../modules/User")
const {verifyRefreshToken} =require("../utils/jwtTokens")
const checkRefreshToken=async(req,res,next)=>{
    try{
        const token = req.signedCookies?.refreshToken

        if(!token){
            return res.status(401).json({success: false, message:"Refresh token not found"})
        }

        let verifytoken;


        try {
            verifytoken = await verifyRefreshToken(token)
        } catch (err) {
            return res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
        }

        const findUser = await User.findOne({_id:verifytoken._id})

        if(!findUser){
            return res.status(404).json("User Not Found")
        }

        const user = {
            _id: verifytoken._id,
            name: verifytoken.name,
            email: verifytoken.email,
        }

        req.user=user;

        next();
    }catch(err){
        return res.status(400).json({success:false,message:`Error in jwt Validation ${err}`})
    }
}

module.exports={checkRefreshToken}