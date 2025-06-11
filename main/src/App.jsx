import { useState } from 'react'
import Form from './components/Form'
import './index.css'
function App() {

  const [unit, setUnit] = useState(null)
  const units = ['length', 'weight', 'temparature']
  const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

  return (
    <>
      <h1>Unit Converter</h1>
      <div>
        {units.map(unit => (
          <button key={unit} onClick={() => setUnit(unit)}>{toTitleCase(unit)}</button>
        ))}
      </div>
      {unit && <Form unit={unit} />}
    </>
  )
}

export default App
