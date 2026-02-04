
const mongoose = require("mongoose")

const connectDB=async()=>{
    try{
        console.log(process.env.MONGODB_DB);
        
        await mongoose.connect(process.env.MONGODB_DB)
        console.log(`Connected to ${process.env.MONGODB_DB} database`)
    }catch(err){
        console.log(`Error While connecting DB ${err}`)
    }
}

module.exports= connectDB