

// Components
import Search from "./Search";

import { useTheme } from "../../context/Theme";
// Images
import logo from "../../assets/images/logo.png"

// Libraries
import { Link, NavLink } from "react-router-dom"
import { useState } from "react";

// Icons
import { IoCartSharp, IoSearch } from "react-icons/io5";
import { FaHeart, FaUserCircle } from "react-icons/fa";
// Styles
import "./Navbar.css"

import { useSelector } from "react-redux"


const Navbar = () => {
    const { isAuthReady, user, token } = useSelector(state => state.auth)
    const [searchToggle, setSearchToggle] = useState(false);
    const { handleBackdropToggle } = useTheme();
    const handleLogout = () => {
        // dispatch(logoutUser());
    };

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
                                <li className="nav-item"><button className="nav-link" onClick={() => { setSearchToggle(true); handleBackdropToggle() }}><IoSearch /></button></li>
                                <li className="nav-item"><Link to="/cart" className="nav-link"><IoCartSharp /><sup><span className="nav-product-count">2</span></sup></Link></li>
                                <li className="nav-item"><Link to="/wishlist" className="nav-link"><FaHeart /><sup><span className="nav-product-count">2</span></sup></Link></li>
                                {isAuthReady && (!user || !token) ? (

                                    <li className="nav-item">
                                        <Link to="/auth" className="nav-link">
                                            <FaUserCircle />
                                        </Link>
                                    </li>
                                ) : (
                                    
                                    <li className="nav-item dropdown">
                                        <button
                                            className="nav-link dropdown-toggle d-flex align-items-center"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            type="button"
                                        >
                                            <FaUserCircle className="me-1" />
                                            <span className="ms-1">{user?.name}</span>
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                            <li>
                                                <Link className="dropdown-item" to="/profile">
                                                    Profile
                                                </Link>
                                            </li>

                                            <li>
                                                <Link className="dropdown-item" to="/orders">
                                                    Orders
                                                </Link>
                                            </li>

                                            <li><hr className="dropdown-divider" /></li>

                                            <li>
                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            {searchToggle && <Search closeSearch={() => { setSearchToggle(false); handleBackdropToggle() }} />}
        </>
    )
}

export default Navbar
