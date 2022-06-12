import React, { useEffect, useState } from 'react'
import api from '../../../../services/api'
import { useParams, useHistory } from 'react-router-dom';
import Nav from '../../../../components/nav'
import { toast } from 'react-toastify'

//http://34.95.147.194/


function App() {
  const [question, setQuestion] = useState([])
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
      try {
        const response = (await api.get(`/questions/one/${id}`, config)).data
        if (response === null) {
          history.replace('/login') //TODO:Redirect to login page
          return
        }
        setQuestion(response)
      } catch (e) {
        history.push('/login')
        toast.warning('Você precisa ser admin!')
      }
    }

    loadMainQuestion()
  }, [id, history])


  async function updateQuestion(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    try {
      const enunciado = document.querySelector('#enunciado').value
      const categoria = document.querySelector('#categoria').value
      const response = await (api.put(`/questions/${id}`, {
        enunciado: enunciado,
        categoria: categoria
      }, config))

      if (response.data === 'Enunciado ja existente!') return toast.warning(response.data)
      if (response.errors) return toast.warning('Enunciado Invalido!')
      toast.success(`Pergunta: " ${enunciado} " editada com sucesso`)
      setQuestion({
        enunciado: enunciado,
        categoria: categoria
      })
    } catch (e) {
      toast.warning('Enunciado invalido')
    }
  }

  return (
    <div>
      <Nav />
      <form className="users" onSubmit={e => updateQuestion(e)} >
        <h3>Você esta editando a pergunta de categoria: {question.categoria}</h3>
        <div className="inputs-div">
          <textarea required id="enunciado" placeholder="Digite o enunciado" />
          <input required id="categoria" type="text" placeholder="Digite a categoria" />
          <button type="submit" className="question-button">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default App;
