
import {useForm} from "react-hook-form";
import {loginSchema} from "../../utils/authFormSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import PasswordInput from "../../components/inputs/PasswordInput";
import Input from "../../components/inputs/Input";


const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver:zodResolver(loginSchema)
    });

    const handleLogin = (data) => {
        console.log(data);
        // Add login logic here
        
    }
    return (
        <>
            <form action="" className="login-form" onSubmit={handleSubmit(handleLogin)}>
                <div className="">
                    <Input type="email" id="email" label="Email:" placeholder="Enter your email" errors={errors} className="form-control" register={register} name="email" />
                    <PasswordInput register={register} name="password" label="Password:" errors={errors} id="password" placeholder="Enter your password" className="form-control"/>
                    <div className="text-end">
                        <button className="btn" type="button">Forgot Password?</button>
                    </div>
                    <div className=" form-group">
                        <button type="submit" disabled={Object.keys(errors).length > 0} className="btn btn-primary w-100 my-3">Login</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login
