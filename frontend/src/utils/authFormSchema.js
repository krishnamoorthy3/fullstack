import {z} from "zod";

export const loginSchema = z.object({
    email:  z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
    password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters long").regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"), "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character")
});

export const registerSchema = z.object({
    name:z.string().nonempty("Name is required").min(2, "Name must be at least 2 characters long"),
    email:  z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
    password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters long").regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"), "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const otpSchema = z.object({
    otp:  z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be 6 digits long").regex(/^[0-9]{6}$/, "OTP must contain only digits"),
});
export const resetOtpSchema = z.object({
    otp:  z
    .string()
    .min(1, "OTP is required")
    .length(6, "OTP must be 6 digits long").regex(/^[0-9]{6}$/, "OTP must contain only digits"),
});


export const forgotPasswordSchema = z.object({
    email:  z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
});
export const resetPasswordSchema = z.object({
    password: z.string().nonempty("Password is required").min(8, "Password must be at least 8 characters long").regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"), "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});