import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import {
    toast
} from 'react-toastify'
import { useHistory } from "react-router-dom";

//http://34.95.147.194/


function App() {
    const history = useHistory()
    const [checkCode, setCheckCode] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        async function isLoggedIn() {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }

            }
            await api.get('/checkJWT', config)
            history.push('/') //Usuario ja esta logado
        }
        isLoggedIn()
    }, [token, history])

    async function handleSubmit(e) {
        e.preventDefault()
        if (checkCode) {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }

            }
            try {
                const request = await api.post('/checkcode', {
                    "code": code
                }, config)
                toast.success(request.data.result)
                localStorage.setItem("token", request.data.token)
                history.push('/')
            } catch (e) {
                toast.warning('Codigo Inválido')
            }

        } else {
            if (!email) return toast.warning('Email nao inserido!')
            const result = await api.post('/', {
                "email": email
            })
            const userToken = result.data.token
            setToken(userToken)
            toast.success('E-Mail Enviado, basta confirmar o codigo!')
            setCheckCode(true)
        }
    }
    return (
        <form className="login" >
            <h1> Login </h1>

            {checkCode ?
                <>
                    <input required value={email} onChange={e => setEmail(e.target.value)} readOnly="readonly" id="block" />
                    <input required placeholder='Digite seu Codigo...' value={code} onChange={e => setCode(e.target.value)} id="code" type="number" />
                </>
                :
                <>
                    <input required placeholder='Email' id="email" value={email} onChange={e => setEmail(e.target.value)} />
                </>
            }
            <button onClick={e => handleSubmit(e)} > Submit </button>
        </form>
    )
}

export default App;