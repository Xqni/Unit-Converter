import { useState, useEffect } from 'react'
import sendreq from '../services/conversion'
import Result from './Result'

const unitCategories = {
    length: ['millimeter', 'centimeter', 'meter', 'kilometer', 'inch', 'foot', 'yard', 'mile'],
    weight: ['milligram', 'gram', 'kilogram', 'ounce', 'pound'],
    temparature: ['celsius', 'fahrenheit', 'kelvin'],
}

const Form = ({ unit }) => {
    const [returnValue, setReturn] = useState(null)
    const [value, setValue] = useState(0)
    const [fromUnit, setFromUnit] = useState('')
    const [toUnit, setToUnit] = useState('')
    const [categories, setCategory] = useState([])

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

    const handlSubmit = async e => {
        e.preventDefault()
        if (isNaN(value)) return
        if (fromUnit === '' || toUnit === '') return
        const unitObject = { value: parseFloat(value), fromUnit, toUnit }
        console.log(sendreq(unit, unitObject))
        const result = await sendreq(unit, unitObject)
        setReturn(result)
    }

    const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

    return (
        <>
            <h3>{toTitleCase(unit)} Converter</h3>
            <form onSubmit={handlSubmit}>
                <div>
                    <div>Enter the {unit} to convert</div>
                    <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
                    <div>
                        <label htmlFor='fromUnitSelect'>Unit to convert from </label>
                        <div>
                            <select id='fromUnitSelect' value={fromUnit} onChange={e => setFromUnit(e.target.value)}>
                                <option value="" disabled>Select</option>
                                {categories.map(category => (
                                    <option value={category} key={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='toUnitSelect'>Unit to convert to </label>
                        <div>
                            <select id='toUnitSelect' value={toUnit} onChange={e => setToUnit(e.target.value)}>
                                <option value="" disabled>Select</option>
                                {categories.map(category => (
                                    <option value={category} key={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button type='submit'>convert</button>
            </form>
            {returnValue && <Result returnValue={returnValue} />}
        </>
    )
}

export default Form