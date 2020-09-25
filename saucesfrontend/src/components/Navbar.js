import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/PREACHERSLOGO.png'

const Navbar = () => {
    return (
        <div className="nav-container">
            <Link className="homeLogo" to="/"><img src={logo} /></Link>

        </div>
    )
}

export default Navbar
