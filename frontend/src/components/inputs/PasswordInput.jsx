import { useState } from "react";
import { FaEye , FaEyeSlash } from "react-icons/fa";
import "./PasswordInput.css";
const PasswordInput = ({register,name, errors,...props}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <div className="form-group password-inp position-relative">
                        <label htmlFor={props.id}>{props.label || "Password:"}</label>
                        <input
                            type={showPassword ? "text" : "password" }
                            {...props}
                            {...register(name)}
                            autoComplete={name}
                        />
                <span className="password-icon" onClick={()=>setShowPassword(prev=>!prev)}>{showPassword ? <FaEyeSlash/> : <FaEye/>}</span>
            {errors[name] && <span className="err-msg">{errors[name].message}</span>}
            </div>
        </>
    )
}

export default PasswordInput
