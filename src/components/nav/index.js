import React from 'react'
import { Link } from 'react-router-dom'
function Header() {  
  return (
    <nav id="nav" >
        <Link to="/admin" >Usuários</Link>
        <Link to="/admin/questions" >Questions</Link>
    </nav>
  )
}

export default Header;
