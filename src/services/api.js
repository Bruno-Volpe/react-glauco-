import axios from 'axios'

//Base URL -> https://sujeitoprogramador.com/

// r-api/?api=filmes (Todos os filmes)

// r-api/?api=filmes/123 (Filme com ID 123)

const api = axios.create({
    baseURL: 'http://34.95.147.194'
})

export default api