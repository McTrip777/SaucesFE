import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/PREACHERSLOGO.png'

const Navbar = () => {
    return (
        <div className="nav-container">
            <Link className="homeLogo" to="/"><img src={logo} /></Link>
            <div className="paths">
                <Link className="shopPath" to="/shop">Shop</Link>
                <Link className="historyPath" to="/history">History</Link>
                <Link className="contactPath" to="/contact">Contact</Link>
            </div>
        </div>
    )
}

export default Navbar
