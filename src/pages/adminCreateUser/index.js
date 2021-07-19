import React from 'react'
import api from '../../services/api'
import { toast } from 'react-toastify'
import Nav from '../../components/nav'

//http://34.95.147.194/


function App() {  
    async function createUser(e) {
        e.preventDefault()
        try {
          let email = document.querySelector('#email').value
          const response = await (api.post('/admin', {email: email}))
  
          if (response.data === 'Email ja existente!') return toast.warning(response.data)
          if (response.errors) return toast.warning('Email Invalido!')
          toast.success(`Criado: ${response.data.email}`)
        } catch (e) {
          toast.warning('Email invalido')
        }
      }

  return (
      <div>
          <Nav />
          <form className="users" onSubmit={e => createUser(e)} >
            <h3>Bem vindo ao menu de criação de Usuários</h3>
            <div className="inputs-div">
                <input id="email" type="text" placeholder="Digite o Email" />
                <button type="submit" className="question-button">Create</button>
              </div>
          </form>
      </div>
  )
}

export default App;
