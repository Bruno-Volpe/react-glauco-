import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../../../services/api'
import { useParams, useHistory } from 'react-router-dom';
import { FaComment } from 'react-icons/fa'
import Nav from '../../../../components/nav'

//http://34.95.147.194/


function App() {
  const [detail, setDetail] = useState()
  const [load, setLoad] = useState(false)
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
      try {
        setLoad(true)
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        }
        const response = (await api.get(`/answer/detailUser/${id}`, config)).data

        if (response === null) {
          history.replace('/')
          return
        }
        setDetail(response)
      } catch (e) {
        history.push('/login')
        toast.warning('Você precisa ser admin!')
      }
    }

    loadMainQuestion()
  }, [id, history])

  return (
    <div>
      <Nav />
      <div className='users'>
        {!load && <h3>Carregando...</h3>}

        {
          load && detail !== undefined && (
            <div>
              <h3>"{detail[0].user}" - Details</h3>
              {detail.map(item => {
                return (
                  <div>
                    <ul className="restore" >
                      <li>
                        <FaComment className="FaComment" /> {item.question}
                      </li>
                      <li className="answer" >
                        <small>R: {item.answer}</small>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App;
