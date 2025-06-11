import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const sendreq = async (unit, object) => {
    const request = axios.post(`${baseUrl}${unit}`, object)
    const response = await request
    return response.data
}

export default sendreq