const jwt= require("jsonwebtoken")
const ms= require("ms")

const createAccessToken=(user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE})
}

const createRefreshToken=(user)=>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE})
}

const verifyRefreshToken=(token)=>{
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

const verifyAccessToken=(token)=>{
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

const removeRefreshToken=(res)=>{
    const tokenexp=ms(process.env.REFRESH_TOKEN_EXPIRE)

    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production", // send only on https in prod
        sameSite: "Lax",    // CSRF protection
        maxAge: tokenexp, 
        signed: true,
    })
}

const attach_RefreshToken=(user,res)=>{
    const refreshtoken = createRefreshToken(user)

    const tokenexp=ms(process.env.REFRESH_TOKEN_EXPIRE)

    res.cookie("refreshToken",refreshtoken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production", // send only on https in prod
        sameSite: "Lax",    // CSRF protection
        maxAge: tokenexp, 
        signed: true,
    })
    
    return refreshtoken
}

module.exports={attach_RefreshToken,removeRefreshToken,verifyAccessToken,verifyRefreshToken,createAccessToken,createRefreshToken}
