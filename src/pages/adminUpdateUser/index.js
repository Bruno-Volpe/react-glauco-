import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useParams, useHistory } from 'react-router-dom';
import Nav from '../../components/nav'
import { toast } from 'react-toastify'

//http://34.95.147.194/


function App() {
    const [user, setUser] = useState([])
    const { id } = useParams();
    const history = useHistory()

    useEffect(() => {
        async function loadMainQuestion() {
            const response = (await api.get(`/admin/${id}`)).data.user
        
            if(response.length === 0){
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
        const email = document.querySelector('#email').value
        const response = await (api.put(`/admin/${id}`, {email: email}))

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
                <input id="email" type="text" placeholder="Digite o Novo Email" />
                <button type="submit" className="question-button">Submit</button>
              </div>
          </form>
      </div>
  )
}

export default App;
