import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { useParams, useHistory } from "react-router-dom";
import { toast } from 'react-toastify'

//http://34.95.147.194/


function App() {
  const [question, setQuestion] = useState([])
  const { answear } = useParams();
  const history = useHistory()

  useEffect(() => {
    async function loadMainQuestion() {
      const response = (await api.get(`/questions/${answear}`)).data

      if (response.length === 0) {
        history.replace('/')
        return
      }

      setQuestion(response)
    }

    loadMainQuestion()
  }, [answear, history])

  function handleInput(event) {
    let selecteds = []
    const boxes = document.querySelectorAll('.question-alternative')

    boxes.forEach(box => {
      if (box.checked) {
        selecteds.push(box.value)
      }
    })

    console.log(selecteds)

    if (question.length !== selecteds.length) {
      toast.warning('Formulario Invalido!')
      return
    }

    createAnswer(selecteds)
  }

  function createAnswer(selecteds) {
    try {
      console.log(selecteds)
      if (selecteds.length > 0) {
        let contador = 0

        question.map(async item => {
          const response = await api.post('/answer', {
            'answer': selecteds[contador],
            'user_id': '1',
            'question_id': item.id
          })
          contador++
          if (response.data === 'Pergunta nao existente!' || response.data === 'Usuario nao existente!') return toast.warning(response.data)
          if (response.errors) return toast.warning('Formulario Invalido!')
        })

        toast.success('Respostas salvas com sucesso!')
      }
    } catch (e) {
      console.log(e)
      toast.error('Erro ao salvar as respostas!')
    }
  }

  return (
    <div className="perguntas">
      {question.map(item => {
        return (
          <form className="question-form" method="post" >
            <h1 key={item.enunciado} className="question-enunciado">{item.enunciado}</h1>
            <label><input className="question-alternative" type="radio" name="question" value="Opcao 1" />Opcao 1 </label>
            <label><input className="question-alternative" type="radio" name="question" value="Opcao 2" />Opcao 2 </label>
            <label><input className="question-alternative" type="radio" name="question" value="Opcao 3" />Opcao 3 </label>
          </form>
        )
      })}
      <button type="button" className="question-button" onClick={e => handleInput(e)}>Submit</button>
    </div>
  )
}

export default App;
