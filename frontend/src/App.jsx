import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

const api = axios.create({
  baseURL: 'http://localhost:3001',
})

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  useEffect(() => {
    api.get('/usuarios').then((response) => {
      console.log(response.data)
      setUsers(response.data)
    })
  }, [])

  function newUser() {
    api
      .post('/usuarios', {
        age,
        name,
      })
      .then((response) => {
        console.log(response)
      })
  }

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.name}>
            Nome: {user.name} - Idade: {user.age}
          </li>
        ))}
      </ul>

      <h2>Adicionar novo usuário</h2>
      <input
        placeholder="Nome"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder="Idade"
        onChange={(event) => setAge(event.target.value)}
      />
      <button onClick={newUser}>Adicionar usuário</button>
    </div>
  )
}

export default App
