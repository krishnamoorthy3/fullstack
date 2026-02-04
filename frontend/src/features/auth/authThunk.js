import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

axios.defaults.baseURL="http://localhost:5000/api"

const registerUser= createAsyncThunk("auth/registerUser",async(data,thunkAPI)=>{
    try{
        const fetchData= await axios.post("/v1/auth/register",{data},{withCredentials:true})
        console.log(fetchData);
        
    }catch(err){
        console.log(err);
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

const sendOtp=createAsyncThunk("auth/sendOtp",async(data,thunkAPI)=>{
    try{
        
        const fetchData= await axios.post("/v1/verify/verify-email",data,{withCredentials:true})
        return fetchData.data
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

export {registerUser, sendOtp}