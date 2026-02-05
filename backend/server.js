require('dotenv').config({path:'./.env'});

const express=require('express');
const app = express();
const cors=require('cors');
const connectDB=require('./database/connectdb'); //database connection 
const {corsOptions} = require('./config/cors');
const cookieParser= require('cookie-parser')

const PORT = process.env.PORT || 3000;


app.use(cookieParser(process.env.COOKIE_SECRET))
// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors(corsOptions));



app.get('/', (req, res) => {
    res.send('Hello, World!');
    res.end();
});

// authentication routes
app.use("/api/v1/auth",require('./routes/authenticationRoutes.js'));

// verify email routes
app.use("/api/v1/verify",require('./routes/verifyRoutes.js'));

app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"Route Not Found"
    });
});


const startServer=async()=>{
    try{
        await connectDB()
        app.listen(PORT,()=>{
            console.log(`Server is running in PORT: ${PORT}`)
        })
    }catch(err){
        console.log("Failed to start Server",err)
    }
}
startServer()
