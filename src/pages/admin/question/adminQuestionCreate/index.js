import React, { useEffect } from 'react'
import api from '../../../../services/api'
import { toast } from 'react-toastify'
import Nav from '../../../../components/nav'
import { useHistory } from "react-router-dom";


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

  async function createQuestion(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    try {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }

      let enunciado = document.querySelector('#enunciado').value
      let categoria = document.querySelector('#categoria').value
      const response = await (api.post('/questions/', {
        enunciado: enunciado,
        categoria: categoria
      }, config))

      if (response.data === 'Enunciado ja existente!') return toast.warning(response.data)
      if (response.errors) return toast.warning('Enunciado Invalido!')
      toast.success(`Criado: ${response.data.enunciado}`)
    } catch (e) {
      toast.warning(e.errors)
    }
  }

  return (
    <div>
      <Nav />
      <form className="users" onSubmit={e => createQuestion(e)} >
        <h3>Bem vindo ao menu de criação de perguntas</h3>
        <div className="inputs-div">
          <textarea required id="enunciado" placeholder="Digite o enunciado" />
          <input required id="categoria" type="text" placeholder="Digite a categoria" />
          <button type="submit" className="question-button">Create</button>
        </div>
      </form>
    </div>
  )
}

export default App;
