import { lazy,Suspense ,useState} from "react";
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));


import "./Authentication.css"


const Authentication = () => {

    const [isLogin, setIsLogin] = useState(true);
    const handleToggle = () => {
        setIsLogin(!isLogin);
    }
    return (
        <>

            <section className="auth-wrapper">
                <div className="container">
                    <div>
                        <h1 className="text-center">Login</h1>
                        <p className="text-center" >Please enter your e-mail and password:</p>
                            <Suspense fallback={<div className="loading">Loading...</div>}>
                                {isLogin ? <Login /> : <Register />}
                            </Suspense>
                        <div className="auth-btn-wrapper text-center">
                            {isLogin ? (<p>New customer? <button onClick={handleToggle}>Register</button></p>) : (<p>Already have an account? <button onClick={handleToggle}>Login</button></p>)}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Authentication
