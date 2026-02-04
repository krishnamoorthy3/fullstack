// Libraries
import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

import { useTheme } from "./context/Theme.jsx";


const Navbar=lazy(()=>import("./components/header/Navbar"))  
const Products=lazy(()=>import("./pages/product/Products"))  
const Authentication=lazy(()=>import("./pages/authentication/Authentication"))  
const Home=lazy(()=>import("./pages/homepage/Home"))
const ForgotPassword=lazy(()=>import("./pages/authentication/ForgotPassword"))
const VerifyOtp=lazy(()=>import("./pages/authentication/VerifyOtp"))
const CreatePassword=lazy(()=>import("./pages/authentication/CreatePassword"))

import {ToastContainer} from "react-toastify"



// Styles
import "./App.css"




const App = () => {
  const {backdrop}=useTheme();
  return (
    <>
    <ToastContainer/>
    <div className="back-drop mask" style={backdrop?{display:"block"}:{display:"none"}}></div>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Navbar />
      </Suspense>
        <main className="mt-5">
          <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Products />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/verify-otp" element={<VerifyOtp />} />
          <Route path="/auth/create-new-password" element={<CreatePassword />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
        </Suspense>
        </main>
    </>
  )
}

export default App
