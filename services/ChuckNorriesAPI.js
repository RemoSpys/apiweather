import axios from 'axios'

const chuckNorrisAPI = axios.create({
    baseURL: 'https://api.chucknorris.io/jokes',
})

export default chuckNorrisAPI