# Frontend
![Screenshot 2025-06-14 182934](https://github.com/user-attachments/assets/af654fdc-3c87-4a73-aa7d-4f7822cdfeb6)


This is what the users basically see when visiting the link. Although not quite true because a production build with latest changes is created and deployed on the fly. The build happens in the deployment process which I defined commands for on Render.
``` javascript
import { useState } from 'react'
import Form from './components/Form'
import './index.css'
function App() {
  // initialize state to keep track of selected unit converter
  const [unit, setUnit] = useState(null)
  const units = ['length', 'weight', 'temparature'] // different converters available
  const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() // function for title-casing

  return (
    <div className='container'>
      <div className='main'>
        <h1 className='heading'>Unit Converter</h1>
        <div>
          {/* buttons for units */}
          {units.map(unit => (
            <button key={unit} onClick={() => setUnit(unit)}>{toTitleCase(unit)}</button>
          ))}
        </div>
        {/* if unit is selected then display the related form */}
        {unit && <Form unit={unit} />}
      </div>
    </div>
  )
}

export default App
```
The App component itself is not that heavy and loaded but the use of different components makes it much more managable.


Currently, for the frontend itself I am using React library to build UI components and display them in JSX files.
I also refactored my code to ensure clean management. For example:
- 'src/components/' contains all the components that I created and used in the application. Also worth noting that I can reuse these at any point in time.
- 'src/services/' directory has the api conversation. Basically the conversation with the backend happens here.

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

I used [axios](https://axios-http.com/docs/intro) for my http request handling.
