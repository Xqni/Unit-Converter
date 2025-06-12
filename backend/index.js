// imports express and cors (dont really need cors but for dev env I do need it)
const express = require('express')
const cors = require('cors')

// initialize/create an express app
const app = express()

// middlewares
app.use(express.json()) // to be able to parse json data
app.use(cors()) // to allow requests from different origins
app.use(express.static('dist')) // to display front-end build

// if something goes wrong
app.get('/', (request, response) => {
    response.send('If you are seeing this, I messed up I guess ! (┬┬﹏┬┬)')
})

// length conversion api
app.post('/length', (request, response) => {
    let returnObj = {} // empty object
    const body = request.body // get data that was sent
    const { value, fromUnit, toUnit } = body // destructure the data


    // measurements relative to meter, everything else is converted from meter
    const toMeterFactor = {
        millimeter: 0.001,
        centimeter: 0.01,
        meter: 1, // main
        kilometer: 1000,
        inch: 0.0254,
        foot: 0.3048,
        yard: 0.9144,
        mile: 1609.344
    }

    const fromFactor = toMeterFactor[fromUnit] // select from which
    const toFactor = toMeterFactor[toUnit] // select to which

    if (!fromFactor || !toFactor) throw new Error('Invalid unit')

    // convert the value
    const convertedValue = (value * fromFactor) / toFactor

    // populate the empty object with data
    returnObj = { value: convertedValue, fromUnit, toUnit }

    // send data back
    response.json(returnObj)
})

// weight conversion api
app.post('/weight', (request, response) => {
    let returnObj = {} // empty object
    const body = request.body // get data that was sent
    const { value, fromUnit, toUnit } = body // destructure the data

    // measurements relative to gram, everything else is converted from gram
    const toGramFactor = {
        milligram: 0.001,
        gram: 1, // main
        kilogram: 1000,
        ounce: 28.3495,
        pound: 453.592
    }

    const fromFactor = toGramFactor[fromUnit] // select from which
    const toFactor = toGramFactor[toUnit] // select to which

    if (!fromFactor || !toFactor) throw new Error('Invalid unit')

    // convert the value
    const convertedValue = (value * fromFactor) / toFactor

    // populate the empty object with data
    returnObj = { value: convertedValue, fromUnit, toUnit }

    // send data back
    response.json(returnObj)
})

// temparature conversion api
app.post('/temparature', (request, response) => {
    let returnObj = {} // empty object
    const body = request.body // get data that was sent
    const { value, fromUnit, toUnit } = body // destructure the data

    // function packed object to convert to celsius
    const toCelsius = {
        celsius: value => value,
        fahrenheit: value => (value - 32) * 5 / 9,
        kelvin: value => value - 273.15
    }
    
    // function packed object to convert from celsius
    const fromCelsius = {
        celsius: value => value,
        fahrenheit: value => (value * 9 / 5) + 32,
        kelvin: value => value + 273.15
    }

    // initialize functions
    const normalize = toCelsius[fromUnit] // converts to celsius
    const convert = fromCelsius[toUnit] // converts to desired unit

    if (!normalize || !convert) throw new Error('Invalid temperature unit')

    // convert the value to celsius
    const celsius = normalize(value)

    // convert the value
    const convertedValue = convert(celsius)

    // populate the empty object with data
    returnObj = { value: convertedValue, fromUnit, toUnit }

    // send data back
    response.json(returnObj)
})

// if deployed only gets a dynamic port
// locally gets 3001 or whatever is free define here
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})