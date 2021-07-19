import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useParams, useHistory } from 'react-router-dom';
import Nav from '../../components/nav'
import { toast } from 'react-toastify'

//http://34.95.147.194/


function App() {
    const [detail, setDetail] = useState([])
    const { id } = useParams();
    const history = useHistory()

    useEffect(() => {
        async function loadMainQuestion() {
            const response = (await api.get(`/admin/${id}`)).data
            const user = response.user
            const questions = response.questions
        
            if(response.length === 0){
                history.replace('/')
                return
            }

            setDetail({
              user: user,
              questions: questions
            })
          }

        loadMainQuestion()
    }, [id, history])
    
    return (
      <div>
          <Nav />
          <div className='users'>
            <h3>{detail.user.email}</h3>  
          </div>
      </div>
  )
}

export default App;
