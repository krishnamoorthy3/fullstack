import React from 'react'

const Input = ({ register, name, label, errors, ...props }) => {
    return (
        <>
            <div className=" form-group">
                        <label htmlFor={name}>{label}</label>
                        <input
                            id={name}
                            autoComplete="email"
                            {...register(name)}
                            {...props} />
                            {errors[name] && <span className="err-msg">{errors[name].message}</span>}
                    </div>
        </>
    )
}

export default Input
