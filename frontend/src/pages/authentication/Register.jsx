import { useForm } from "react-hook-form";
import { registerSchema,otpSchema } from "../../utils/authFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "../../components/inputs/PasswordInput";
import Input from "../../components/inputs/Input";

const Register = () => {
    const {register,formState:{errors} ,handleSubmit} = useForm({
        resolver: zodResolver(registerSchema)
    });
    const {register: otpRegister,formState:{errors: otpErrors} ,handleSubmit: otpHandleSubmit} = useForm({
        resolver: zodResolver(otpSchema)
    });

    const handleRegister = (data) => {
        console.log(data);
        // Handle registration logic here
    }

    const handleOtpSubmit = (data) => {
        console.log(data);
        // Handle OTP submission logic here
    }
    return (
        <>
            <form action="" className="login-form" onSubmit={handleSubmit(handleRegister)}>
                <div className="">
                    <Input label="Name:" id="name" className="form-control" placeholder="Enter your name" errors={errors} register={register} name="name" />
                    <div className="form-group register-email-otp">
                        <label htmlFor="email">Email:</label>
                        <input autoComplete="email" type="email" id="email" placeholder="Enter your email" className="form-control" {...register("email")} />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                        <button className="verify-btn btn btn-primary">Verify</button>
                    </div>
                    <div className=" form-group register-email-otp">
                        <label htmlFor="otp">OTP:</label>
                        <input autoComplete="one-time-code" maxLength={6} type="text" id="otp" placeholder="Enter your OTP" className="form-control" {...otpRegister("otp")} />
                        {otpErrors.otp && <p className="text-danger">{otpErrors.otp.message}</p>}
                        <button className="">Resend OTP(12s)</button>
                        <button className="verify-btn btn btn-primary" type="button" onClick={otpHandleSubmit(handleOtpSubmit)}>Submit</button>
                    </div>
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
