import React, {useEffect, useState} from 'react'
import api from '../../../services/api'
import {
    toast
} from 'react-toastify'

//http://34.95.147.194/


function App() {
    function handleSubmit(e) {
        e.preventDefault()
        const email = document.querySelector('#email')
        if (!email) return toast.warning('Email nao inserido!')
        api.post('/', {
            "email": email
        })
        toast.success('E-Mail Enviado, basta confirmar o codigo!')
    }
    return ( 
        <form className = "login" >
            <h1> Login </h1>  
            <input required placeholder = 'Digite seu E-mail...' id = "email" />
            <button onClick = {e => handleSubmit(e)} > Submit </button> 
        </form>
    )
}

export default App;