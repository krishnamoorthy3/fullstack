
import Input from "../../components/inputs/Input"
import { useForm } from "react-hook-form";
import {resetOtpSchema} from "../../utils/authFormSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import "./Authentication.css"
const VerifyOtp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver:zodResolver(resetOtpSchema)
    });

    const handleVerifyOtp = (data) => {
        console.log(data);
        // Add verify OTP logic here
    }
    return (
        <>
            <section className="auth-wrapper">
                <div className="container">
                    <h1 className="text-center">Verify OTP</h1>
                    <form action="" onSubmit={handleSubmit(handleVerifyOtp)}>
                        <Input maxLength={6} type="text" id="otp" name="otp" label="OTP:" register={register} errors={errors} placeholder="Enter the OTP sent to your email" className="form-control" />
                        <button>Resend Otp (12s)</button>
                        <div className=" form-group">
                            <button type="submit" className="btn btn-primary w-100 my-3">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
    }

export default VerifyOtp;
