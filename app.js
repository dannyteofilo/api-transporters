
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//Load routes
let user_routes = require('./routes/user')
let vehicle_routes = require('./routes/vehicle')
let driver_routes = require('./routes/drivers.js')


//middlewares


app.use(bodyParser.urlencoded({ extended: false }))
app.use((err, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETED,DELETE,OPTIONS')
    res.header('Allow', 'GET,POST,PUT,DELETED,DELETE,OPTIONS')

    next()
})
app.use(bodyParser.json())

//cors

//routes
app.use('/api', user_routes)
app.use('/api', vehicle_routes)
app.use('/api',driver_routes)

//exports

module.exports = app