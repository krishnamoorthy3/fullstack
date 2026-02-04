require('dotenv').config({path:'./.env'});

const express=require('express');
const app = express();
const cors=require('cors');
const connectDB=require('./database/connectdb'); //database connection 



const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());



app.get('/', (req, res) => {
    res.send('Hello, World!');
    res.end();
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
