import axios from 'axios'

// import { Container } from './styles';

const api = axios.create({
    baseURL: 'https://sinistrozs-desenvolvimento.techmail.com.br/api'
})

export default api  ;
