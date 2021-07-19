import React from 'react'
import Routes from './routes/routes'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

//http://34.95.147.194/

function App() {
  return (
    <div className="app">
      <Routes />
      <ToastContainer autoClose={3000} position='top-left'/>
    </div>
  )
}

export default App;
