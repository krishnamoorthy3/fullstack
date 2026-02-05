import { createSlice } from "@reduxjs/toolkit";
import {  loginUser, registerUser, sendOtp,verifyOtp,refreshAccessToken } from "./authThunk";
import {  toast } from 'react-toastify';
const initialState={
    user:null,
    token:null,

    otpSent:false,
    otpVerified:false,

    isAuthReady :false,
    loading: {
        otp:false,
        sendotploading: false,
        auth: false,
        refresh: false
        },
    error:null,
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        
         // SEND OTP
        builder.addCase(sendOtp.pending,(state)=>{
            state.loading.sendotploading=true;
            state.otpSent=false;
        })
        .addCase(sendOtp.fulfilled,(state)=>{
            state.otpSent=true;
            state.loading.sendotploading=false;
            toast.success("Otp has been Send to your Email");
        })
        .addCase(sendOtp.rejected,(state,action)=>{
            state.loading.sendotploading=false;
            state.error=action.payload;
            toast.error(action.payload);
            console.log(action);
            
        })

        // Verify OTP
        builder.addCase(verifyOtp.pending,(state)=>{
            state.loading.otp=true;
        })
        .addCase(verifyOtp.fulfilled,(state)=>{            
            state.otpVerified=true;
            state.loading.otp=false;
            toast.success("Otp has been Verified");
        })
        .addCase(verifyOtp.rejected,(state,action)=>{
            state.loading.otp=false;
            state.error=action.payload;
            toast.error(action.payload);
            console.log(action);
        })

        // Register User
        builder.addCase(registerUser.pending,(state)=>{
            state.loading.auth=true;
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.token=action.payload.accessToken
            state.user=action.payload.user
            toast.success(action.payload.message);
            state.loading.auth=false
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading.auth=false;
            state.error=action.payload;
            toast.error(action.payload);
            console.log(action);
        })

        // Login User

        builder.addCase(loginUser.pending,(state)=>{
            state.loading.auth=true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.token=action.payload.accessToken
            state.user=action.payload.user
            toast.success(action.payload.message);
            
            state.loading.auth=false

        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading.auth=false;
            state.error=action.payload;
            toast.error(action.payload);
            console.log(action);

        })

        // Refresh
        builder.addCase(refreshAccessToken.pending,(state)=>{
            state.loading.refresh=true;

        })
        .addCase(refreshAccessToken.fulfilled,(state,action)=>{
            state.token=action.payload.accessToken
            state.user=action.payload.user
            state.loading.refresh=false
            state.isAuthReady=true;
        })
        .addCase(refreshAccessToken.rejected,(state,action)=>{
            state.loading.refresh=false;
            state.error=action.payload;
            console.log(action);
            state.isAuthReady=true;
        })
    }
})


export default authSlice.reducer