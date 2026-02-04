import { createSlice } from "@reduxjs/toolkit";
import {  sendOtp } from "./authThunk";
import {  toast } from 'react-toastify';
const initialState={
    user:null,
    token:null,

    otpSent:false,
    otpVerified:true,

    loading:false,
    error:null,
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        
         // SEND OTP
        builder.addCase(sendOtp.pending,(state)=>{
            state.loading=true;
            state.otpSent=false;
        })
        .addCase(sendOtp.fulfilled,(state)=>{
            state.otpSent=true;
            state.loading=false
            toast.success("Otp has been Send to your Email");
        })
        .addCase(sendOtp.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            toast.error(action.payload);
            console.log(action);
            
        })
    }
})


export default authSlice.reducer