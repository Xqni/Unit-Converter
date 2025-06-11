const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    response.send('Hello World!')
})

app.post('/length', (request, response) => {
    let returnObj = {}
    const body = request.body
    const { value, fromUnit, toUnit } = body


    const toMeterFactor = {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1,
        kilometer: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344
    }

    const fromFactor = toMeterFactor[fromUnit.toLowerCase()]
    const toFactor = toMeterFactor[toUnit.toLowerCase()]

    if (!fromFactor || !toFactor) throw new Error('Invalid unit')

    const convertedValue = (value * fromFactor) / toFactor

    returnObj = { value: convertedValue, fromUnit, toUnit }
    response.json(returnObj)
})

app.post('/weight', (request, response) => {
    let returnObj = {}
    const body = request.body
    const { value, fromUnit, toUnit } = body

    const toGramFactor = {
        milligram: 0.001,
        gram: 1,
        kilogram: 1000,
        ounce: 28.3495,
        pound: 453.592
    }

    const fromFactor = toGramFactor[fromUnit.toLowerCase()]
    const toFactor = toGramFactor[toUnit.toLowerCase()]

    if (!fromFactor || !toFactor) throw new Error('Invalid unit')

    const convertedValue = (value * fromFactor) / toFactor

    returnObj = { value: convertedValue, fromUnit, toUnit }
    response.json(returnObj)
})

app.post('/temparature', (request, response) => {
    let returnObj = {}
    const body = request.body
    const { value, fromUnit, toUnit } = body

    const toCelsius = {
        celsius: value => value,
        fahrenheit: value => (value - 32) * 5 / 9,
        kelvin: value => value - 273.15
    }

    const fromCelsius = {
        celsius: value => value,
        fahrenheit: value => (value * 9 / 5) + 32,
        kelvin: value => value + 273.15
    }

    const normalize = toCelsius[fromUnit]
    const convert = fromCelsius[toUnit]

    if (!normalize || !convert) throw new Error('Invalid temperature unit')

    const celsius = normalize(value)
    const convertedValue = convert(celsius)
    returnObj = { value: convertedValue, fromUnit, toUnit }
    response.json(returnObj)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})