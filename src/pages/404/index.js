import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from "react-router-dom";

//http://34.95.147.194/


function App() {
  return (
    <div className="error404">
        <h1>404</h1>
        <h2>Maybe you are looking for:</h2>
        <Link to='/login' >Login</Link>
    </div>
  )
}

export default App;
