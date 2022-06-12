import React, { useEffect, useState } from 'react'
import api from '../../../../services/api'
import { useParams, useHistory } from 'react-router-dom';
import Nav from '../../../../components/nav'
import { toast } from 'react-toastify'

//http://34.95.147.194/


function App() {
  const [user, setUser] = useState([])
  const { id } = useParams();
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      history.push('/login')
      toast.warning('Você precisa fazer login!')
      return
    }

    async function loadMainQuestion() {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const response = (await api.get(`/admin/${id}`, config)).data.user
      if (response === null) {
        history.replace('/')
        return
      }

      setUser(response)
    }

    loadMainQuestion()
  }, [id, history])


  async function updateUser(e) {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const email = document.querySelector('#email').value
      const response = await (api.put(`/admin/${id}`, { email: email }, config))

      if (response.data === 'Email ja existente!') return toast.warning(response.data)
      if (response.errors) return toast.warning('Email Invalido!')
      toast.success(response.data)
      setUser({
        email: email
      })
    } catch (e) {
      toast.warning('Email invalido')
    }
  }

  return (
    <div>
      <Nav />
      <form className="users" onSubmit={e => updateUser(e)}>
        <h3>Você está editando o {user.email}</h3>
        <div className="inputs-div">
          <input required id="email" type="text" placeholder="Digite o Novo Email" />
          <button type="submit" className="question-button">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default App;
