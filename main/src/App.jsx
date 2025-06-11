import { useState } from 'react'
import Form from './components/Form'

function App() {

  const [unit, setUnit] = useState(null)
  const units = ['length', 'weight', 'temparature']

  return (
    <>
      <h1>Unit Converter</h1>
      <div>
        {units.map(unit => (
          <button key={unit} onClick={() => setUnit(unit)}>{unit}</button>
        ))}
      </div>
      {unit && <Form unit={unit} />}
    </>
  )
}

export default App
