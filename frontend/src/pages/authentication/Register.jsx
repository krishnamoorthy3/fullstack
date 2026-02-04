import { useForm } from "react-hook-form";
import { registerSchema,otpSchema } from "../../utils/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../../components/inputs/PasswordInput";
import Input from "../../components/inputs/Input";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {sendOtp} from "../../features/auth/authThunk"
import { toast } from "react-toastify";

const Register = () => {
    const [otpToggle,setOtpToggle]=useState(false);
    const {loading,otpSent}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()

    const {register,formState:{errors} ,handleSubmit,getValues,trigger } = useForm({
        resolver: zodResolver(registerSchema)
    });
    const {register: otpRegister,formState:{errors: otpErrors} ,handleSubmit: otpHandleSubmit} = useForm({
        resolver: zodResolver(otpSchema)
    });

    const handleRegister = (data) => {
        console.log(data);
        
    }

    const handleOtpSubmit = (data) => {
        console.log(data);
        
    }
const [timer, setTimer] = useState(0);

useEffect(() => {
  if (timer === 0) return;

  const interval = setInterval(() => {
    setTimer((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer]);

    const handleEmailSubmit=async()=>{
        try{
            if(errors.email) return ;
            if(timer) {
                toast.error(`Try after ${timer} Secounds`)
                return;
            }
            const getEmail = await getValues("email");
            if(!getEmail) return

            await dispatch(sendOtp({email:getEmail})).unwrap();
        
            setOtpToggle(true)
            setTimer(30)
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <form action="" className="login-form" onSubmit={handleSubmit(handleRegister)}>
                <div className="">
                    <Input label="Name:" id="name" className="form-control" placeholder="Enter your name" errors={errors} register={register} name="name" />
                    <div className="form-group register-email-otp">
                        <label htmlFor="email">Email:</label>
                        <input autoComplete="email" type="email" id="email" onChange={()=>trigger("email")} placeholder="Enter your email" className="form-control" {...register("email")} />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        <button className="verify-btn btn btn-primary"  disabled={errors.email||loading?true:timer?true:false} type="button" onClick={handleEmailSubmit}>{timer? `Resend in (${timer}s)` :loading?"Sending..." :"Verify"}</button>
                    </div>

                    {otpToggle&&
                        <div className=" form-group register-email-otp">
                        <label htmlFor="otp">OTP:</label>
                        <input autoComplete="one-time-code" maxLength={6} type="text" id="otp" placeholder="Enter your OTP" className="form-control" {...otpRegister("otp")} />
                        {otpErrors.otp && <p className="text-danger">{otpErrors.otp.message}</p>}
                        <button className="verify-btn btn btn-primary" disabled={!otpSent} type="button" onClick={otpHandleSubmit(handleOtpSubmit)}>Submit</button>
                        </div>
                    }
                    

                    <PasswordInput register={register} name="password" label="Password:" errors={errors} id="password" placeholder="Enter your password" className="form-control"/>
                    <PasswordInput register={register} name="confirmPassword" label="Confirm Password:" errors={errors} id="confirmPassword" placeholder="Confirm your password" className="form-control"/>
                    <div className=" form-group">
                        <button type="submit" className="btn btn-primary w-100 my-3">Register</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Register
