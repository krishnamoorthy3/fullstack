import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

axios.defaults.baseURL="http://localhost:5000/api"

const registerUser= createAsyncThunk("auth/registerUser",async(data,thunkAPI)=>{
    try{
        const fetchData= await axios.post("/v1/auth/register",data,{withCredentials:true})
        return fetchData.data
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
        console.log(err);
        
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

const verifyOtp=createAsyncThunk("auth/verifyOtp",async(data,thunkAPI)=>{
    try{
        const fetchData= await axios.post("/v1/verify/verify-otp",data,{withCredentials:true})
        
        return fetchData.data
    }catch(err){
        console.log(err);
        
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

const loginUser=createAsyncThunk("auth/loginUser",async(data,thunkAPI)=>{
    try{
        const fetchData= await axios.post("/v1/auth/login",data,{withCredentials:true})

        
        return fetchData.data
    }catch(err){
        console.log(err);

        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})

const refreshAccessToken=createAsyncThunk("auth/refreshAccessToken",async(data,thunkAPI)=>{
    try{
        const fetchData= await axios.post("/v1/auth/refresh",data,{withCredentials:true})
        return fetchData.data
    }catch(err){
        console.log(err);
        
        return thunkAPI.rejectWithValue(err.response.data.message)
    }
})
export {registerUser, sendOtp,verifyOtp,loginUser,refreshAccessToken}