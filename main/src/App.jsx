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
