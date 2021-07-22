import React, { useEffect, useState } from 'react'
import api from '../../../../services/api'
import {  FaEdit, FaWindowClose, FaQuestion, FaCheck, FaSkull } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Nav from '../../../../components/nav'


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

//http://34.95.147.194/


function App() {
  const [question, setquestion] = useState([])

  useEffect(() => {
    async function loadMainQuestion() {
        const response = (await api.get(`/questions/`)).data
        setquestion(response)
      }

      loadMainQuestion()
  }, [])

  async function deleteQuestion(id, index) {
    try {
      await api.delete(`/questions/${id}`).data
      const newQuestion = [...question]
      newQuestion.splice(index, 1)

      setquestion([...newQuestion])
      return toast.success('Question excluida com sucesso')
    } catch (e) {
      return toast.error('Falha ao excluir o Question')
    }
    
  }

  function submit (id, index) {
    confirmAlert({
      childrenElement: () => <div />,
      customUI: ({ title, message, onClose }) => {
        return(
          <div className='custom-ui'>
            <h3>{`Tem certeza que deseja apagar esta pergunta?`}</h3>
            <button className='confirm' onClick={() => {
              deleteQuestion(id, index)
              onClose()
            }}><FaCheck /> Sim</button>
            <button className='cancel' onClick={onClose}><FaSkull /> Não</button>
          </div>
        )
      },
      willUnmount: () => {}
    })
  };

  return (
    <div>
      <Nav />
        <ul className="users" >
          <Link to="/admin/createQestion" ><FaQuestion className="add-button" /></Link>
          {
            question.map((question, index) => {
              return (
                  <li>
                    {question.enunciado}
                    <div>
                      <Link to={`/admin/updateQuestion/${question.id}`} ><FaEdit className="edit" /></Link>
                      <FaWindowClose onClick={e => submit(question.id, index)} className="delete" />
                    </div>
                  </li>
              )
            })
          }
        </ul>
    </div>
  )
}

export default App;
