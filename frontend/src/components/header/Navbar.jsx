

// Components
import Search from "./Search";

import {useTheme} from "../../context/Theme";
// Images
import logo from "../../assets/images/logo.png"

// Libraries
import { Link, NavLink } from "react-router-dom"
import { useState } from "react";

// Icons
import { IoCartSharp,IoSearch  } from "react-icons/io5";
import { FaHeart,FaUserCircle  } from "react-icons/fa";
// Styles
import "./Navbar.css"




const Navbar = () => {
    const [searchToggle, setSearchToggle] = useState(false);
    const {handleBackdropToggle} = useTheme();
    return (
        <>
        
            <header>
                <nav className="py-4 navbar">
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <div>
                            <Link to="/">
                                <img src={logo} alt="Navbar Logo" />
                            </Link>
                        </div>
                        <div>
                            <ul className="nav-ul">
                                <li className="nav-item"><button className="nav-link" onClick={() => {setSearchToggle(true);handleBackdropToggle()}}><IoSearch /></button></li>
                                <li className="nav-item"><Link to="/cart" className="nav-link"><IoCartSharp /><sup><span className="nav-product-count">2</span></sup></Link></li>
                                <li className="nav-item"><Link to="/wishlist" className="nav-link"><FaHeart /><sup><span className="nav-product-count">2</span></sup></Link></li>
                                <li className="nav-item"><Link to="/login" className="nav-link"><FaUserCircle  /></Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            {searchToggle && <Search closeSearch={() => {setSearchToggle(false);handleBackdropToggle()}} />}
        </>
    )
}

export default Navbar
