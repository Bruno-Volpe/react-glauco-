import React from 'react'
//import { Link } from 'react-router-dom'
import logo from './index.png'

function Header() {
  return (
    <header>
        <img className="logo" src={logo} alt="Infosys" />
    </header>
  )
}

export default Header;
