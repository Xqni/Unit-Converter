import { useState, useEffect } from 'react'

// api conversation and result 
import sendreq from '../services/conversion'
import Result from './Result'

// Units for conversions
const unitCategories = {
    length: ['millimeter', 'centimeter', 'meter', 'kilometer', 'inch', 'foot', 'yard', 'mile'],
    weight: ['milligram', 'gram', 'kilogram', 'ounce', 'pound'],
    temparature: ['celsius', 'fahrenheit', 'kelvin'],
}

const Form = ({ unit }) => {
    // initialize states
    const [returnValue, setReturn] = useState(null) // response from the api
    const [value, setValue] = useState(0) // value user input
    const [fromUnit, setFromUnit] = useState('') // unit to convert from
    const [toUnit, setToUnit] = useState('') // unit to convert to
    const [categories, setCategory] = useState([]) // units to show in options

    // change options everytime user selects between different unit conversions [length, weight, temparature]
    useEffect(() => {
        if (unitCategories[unit]) {
            setCategory(unitCategories[unit])
        } else {
            setCategory([])
        }
        setReturn(null)
        setValue(0)
        setFromUnit('')
        setToUnit('')
    }, [unit])

    // when user submits the form
    const handlSubmit = async e => {
        // dont reload the page
        e.preventDefault()

        // check if the user input is a number
        if (isNaN(value)) return // if value is not a number (NaN)
        if (fromUnit === '' || toUnit === '') return // if conversion units are empty
        const unitObject = { value: parseFloat(value), fromUnit, toUnit } // create a new object to send to api
        const result = await sendreq(unit, unitObject) // wait for the response
        setReturn(result) // change returnValue's state
    }

    // function for title-casing
    const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

    return (
        <>
            <div className='form'>
                {/* Display which unit coverter is selected */}
                <h3>{toTitleCase(unit)} Converter</h3>
                <form onSubmit={handlSubmit}>
                    <div>
                        <div className='input-label'>Enter the {unit} to convert</div>
                        <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
                        <div>
                            <label htmlFor='fromUnitSelect'>Unit to convert from </label>
                            <div>
                                {/* show different units users can convert between */}
                                <select id='fromUnitSelect' value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
                                    <option value="" disabled>Select</option>
                                    {categories.map(category => (
                                        <option value={category} key={category}>{toTitleCase(category)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='toUnitSelect'>Unit to convert to </label>
                            <div>
                                {/* show different units users can convert between */}
                                <select id='toUnitSelect' value={toUnit} onChange={e => setToUnit(e.target.value)}>
                                    <option value="" disabled>Select</option>
                                    {categories.map(category => (
                                        <option value={category} key={category}>{toTitleCase(category)}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className='convert' type='submit'>Convert</button>
                </form>
                {/* show result if there is a return value */}
                {returnValue && <Result returnValue={returnValue} />}
            </div>
        </>
    )
}

export default Form