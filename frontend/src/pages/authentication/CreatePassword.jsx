
import {useForm} from "react-hook-form";
import {resetPasswordSchema} from "../../utils/authFormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import PasswordInput from "../../components/inputs/PasswordInput";

import "./Authentication.css"


const CreatePassword = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver:zodResolver(resetPasswordSchema)
    });

    const handleresetPassword = (data) => {
        console.log(data);
        // Add reset password logic here
        
    }
    return (
        <>
            <section className="auth-wrapper">
                <div className="container">
                    <h1 className="text-center"> Reset Your Password</h1>
                    <form action="" className="login-form" onSubmit={handleSubmit(handleresetPassword)}>
                        <div className="">
                            <PasswordInput register={register} name="password" label="Password:" errors={errors} id="password" placeholder="Enter your password" className="form-control"/>
                            <PasswordInput register={register} name="confirmPassword" label="Confirm Password:" errors={errors} id="confirmPassword" placeholder="Confirm your password" className="form-control"/>
                            <div className=" form-group">
                                <button type="submit" disabled={Object.keys(errors).length > 0} className="btn btn-primary w-100 my-3">Create Password</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}


export default CreatePassword
