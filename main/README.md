# Frontend

This is what the users basically see when visiting the link. Although not quite true because a production build with latest changes is created and deployed on the fly. The build happens in the deployment process which I defined commands for on Render.

Currently, for the frontend itself I am using Reacy library to build UI components and display them in JSX files.
I also refactored my code to ensure clean management. For example:
- src/components contains all the components that I created and used in the application. Also worth noting that I can reuse these at any point in time.
- src/services directory has the api conversation. Basically the conversation with the backend happens here.

``` javascript
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
```
