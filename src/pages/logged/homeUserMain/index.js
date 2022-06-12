import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom";

function App() {
  const [question, setQuestion] = useState([])
  const [selected, setSelected] = useState([])
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      history.push('/login')
      toast.warning('Você precisa fazer login!')
      return
    }

    async function loadMainQuestion() {
      try {
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        const response = (await api.get('/questions/main', config)).data
        setQuestion(response)
      } catch (e) {
        history.push('/login')
        toast.warning('Você precisa fazer login!')
      }
    }
    loadMainQuestion()
  }, [history])

  function handleInput(event) {
    const boxes = document.querySelectorAll('.question-alternative')
    boxes.forEach(box => {
      if (box.checked) {
        setSelected(box.value)
      }
    })
  }

  return (
    <form className="question-form" method="get" action={`/user/${selected}`} >
      {question.map(item => {
        return (
          <h1 key={item.enunciado} className="question-enunciado">{item.enunciado}</h1>
        )
      })}
      <label><input className="question-alternative" type="radio" name="question" value="opcao1" />Opcao 1 </label> <br></br>
      <label><input className="question-alternative" type="radio" name="question" value="opcao2" />Opcao 2 </label> <br></br>
      <label><input className="question-alternative" type="radio" name="question" value="opcao3" />Opcao 3 </label> <br></br>
      <button type="submit" className="question-button" onClick={e => handleInput(e)}>Submit</button>
    </form>
  )
}

export default App;
