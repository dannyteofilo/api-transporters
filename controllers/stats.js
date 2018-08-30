'use strict'

const Vehicle = require('../models/vehicles')
const Travel = require('../models/travels')
const Driver = require('../models/drivers')



function init(req, res, next) {
    Vehicle.count((err, resp) => {
        if (err) {
            return res.status(500).send({ message: 'Request failed' })
        }
        req.vehicle = resp
        next()
    })
}

function drivers(req, res, next) {
    Driver.count((err, resp) => {
        if (err) {            
            return res.status(500).send({ message: 'Request failed' })
        }
        req.driver = resp
        next()
    })
}

function travels(req, res, next) {
    Travel.count((err, resp) => {
        if (err) {
            return res.status(500).send({ message: 'Request failed' })
        }
        res.status(200).send({data: [req.vehicle,req.driver,resp]})        
    })
}


module.exports = {
    init,
    travels,
    drivers
}

