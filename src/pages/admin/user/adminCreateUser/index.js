import React, { useEffect } from 'react'
import api from '../../../../services/api'
import { toast } from 'react-toastify'
import Nav from '../../../../components/nav'
import { useHistory } from 'react-router-dom'


//http://34.95.147.194/


function App() {
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      history.push('/login')
      toast.warning('Você precisa fazer login!')
      return
    }
  }, [history])

  async function createUser(e) {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      let email = document.querySelector('#email').value
      if (!email) toast.warning('E-mail invalido') //TODO: VERIFICAR EMAIL
      const response = await (api.post('/admin', { email: email }, config))
      toast.success(`Criado: ${response.data.email}`)
    } catch (e) {
      history.push('/')
      toast.warning('Admin required')
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
