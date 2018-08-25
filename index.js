'use strict'

const app = require('./app')
const port = 8080
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/transporters', )
    .then(() => {
        //Conexion a la base de datos
        console.log('Connection to database successfull')
        //Crear servidor	
        app.listen(port, () => {
            console.log('Server running in http://localhost:' + port);
        })
    })
    .catch(err => {
        console.log(err)
    })

