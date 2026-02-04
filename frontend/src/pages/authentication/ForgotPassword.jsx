
import Input from "../../components/inputs/Input"
import { useForm } from "react-hook-form";
import {forgotPasswordSchema} from "../../utils/authFormSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import "./Authentication.css"
const ForgotPassword = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver:zodResolver(forgotPasswordSchema)
    });

    const handleForgotPassword = (data) => {
        console.log(data);
        // Add forgot password logic here
    }
    return (
        <>
            <section className="auth-wrapper">
                <div className="container">
                    <h1>Forgot Password</h1>
                    <form action="" onSubmit={handleSubmit(handleForgotPassword)}>
                        <Input type="email" id="email" name="email" label="Email:" register={register} errors={errors} placeholder="Enter your registered email" className="form-control" />
                        <div className=" form-group">
                            <button type="submit" className="btn btn-primary w-100 my-3">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
    }

export default ForgotPassword
