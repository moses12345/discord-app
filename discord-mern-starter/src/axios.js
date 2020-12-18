import axios from 'axios'

const instace = axios.create({
    baseURL:'http://localhost:8002'
})


export default instace