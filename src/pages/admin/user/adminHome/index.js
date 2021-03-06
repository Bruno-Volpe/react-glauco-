import React, { useEffect, useState } from 'react'
import api from '../../../../services/api'
import { FaEdit, FaWindowClose, FaUserPlus, FaCheck, FaSkull } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import Nav from '../../../../components/nav'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'

//http://34.95.147.194/


function App() {
  const [users, setUsers] = useState([])
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
        const response = (await api.get(`/admin`, config)).data
        setUsers(response)
      } catch (e) {
        history.push('/login')
        toast.warning('Você precisa ser admin!')
      }
    }

    loadMainQuestion()
  }, [history])

  async function deleteUser(id, index) {
    const token = localStorage.getItem("token")
    try {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      await api.delete(`/admin/${id}`, config).data
      const newUsers = [...users]
      newUsers.splice(index, 1)

      setUsers([...newUsers])
      return toast.success('Usuario excluido com sucesso')
    } catch (e) {
      return toast.error('Falha ao excluir o usuario')
    }

  }

  function submit(email, index, id) {
    confirmAlert({
      childrenElement: () => <div />,
      customUI: ({ title, message, onClose }) => {
        return (
          <div className='custom-ui'>
            <h3>{`Tem certeza que deseja apagar: ${email}`}</h3>
            <button className='confirm' onClick={() => {
              deleteUser(id, index)
              onClose()
            }}><FaCheck /> Sim</button>
            <button className='cancel' onClick={onClose}><FaSkull /> Não</button>
          </div>
        )
      },
      willUnmount: () => { }
    })
  };

  return (
    <div>
      <Nav />
      <ul className="users" >
        <Link to="admin/create" ><FaUserPlus className="add-button" /></Link>
        {
          users.map((user, index) => {
            return (
              <li>
                <Link className="user-link" to={`/admin/detailUser/${user.id}`} >
                  {user.email}
                </Link>
                <div>
                  <Link to={`/admin/update/${user.id}`} ><FaEdit className="edit" /></Link>
                  {/* <FaWindowClose onClick={e => deleteUser(user.id, index)} className="delete" /> */}
                  <FaWindowClose onClick={e => submit(user.email, index, user.id)} className="delete" />
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
