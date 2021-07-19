import React, { useEffect, useState } from 'react'
import api from '../../services/api'


//http://34.95.147.194/


function App() {
    const [question, setQuestion] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        async function loadMainQuestion() {
            const response = (await api.get('/questions/main')).data
            setQuestion(response)
          }
          loadMainQuestion()
    }, [])

    function handleInput(event) {
      const boxes = document.querySelectorAll('.question-alternative')
      boxes.forEach(box => {
        if(box.checked){
          setSelected(box.value)
        }
      })
    }

  return (
    <form className="question-form" method="get" action={`/user/${selected}`}>
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
