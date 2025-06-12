import axios from 'axios'
const baseUrl = '/'

const sendreq = async (unit, object) => {
    // send data to server and store return value
    const request = axios.post(`${baseUrl}${unit}`, object)
    // wait for request/promise to be fulfilled
    const response = await request
    //return the data attribute of response
    return response.data
}

export default sendreq