"use strict";

const Driver = require("../models/drivers");



function saveDriver(req, res) {
    let params = req.body;
    let driver = new Driver();

    if (params.name && params.lastName && params.numDocument && params.typeDocument) {
        driver.name = params.name
        driver.lastName = params.lastName
        driver.numDocument = params.numDocument
        driver.typeDocument = params.typeDocument
        driver.role = params.role
        driver.image = params.image
        driver.vehicleId = params.vehicleId
        //control vehicle duplicated
        Driver.find({ numDocument: driver.numDocument }).exec((err, drivers) => {
            if (err) { return res.status(500).send({ message: 'Error in the request' }) }
            if (drivers && drivers.length >= 1) {
                return res.status(404).send({ message: 'Driver already exists' })
            } else {
                driver.save(
                    (err,
                        driverStored) => {
                        if (err) {
                            return res.status(500).send({ message: "Failed to save data" });
                        }
                        if (driverStored) {
                            res.status(200).send({ message: 'Driver has been registered' });
                        } else {
                            res.status(404).send({ message: "Driver has not registered" });
                        }
                    }
                );
            }
        })

    } else {
        res.status(403).send({ message: "Some data is required" });
    }
}

function getDrivers(req, res) {
    Driver.find({}, (err, drivers) => {
        if (err) return res.status(500).send({ message: 'Error in the request' })
        if (!drivers) return res.status(404).send({ message: 'Drivers not found' })
        return res.status(200).send({
            data: drivers
        })
    })
}



function updateDriver(req, res) {
    let driverId = req.params.id
    let update = req.body

    Driver.findByIdAndUpdate(driverId, update, { new: true }, (err, driverUpdated) => {
        if (err) return res.status(500).send({ message: 'Error in the request' })
        if (!driverUpdated) return res.status(404).send({ message: 'Driver could not be updated' })
        return res.status(200).send({ message: 'Driver has been updated' })
    })
}

function deleteDriver(req, res) {
    let DriverId = req.params.id

    Driver.findByIdAndRemove(DriverId, (err, driverDeleted) => {
        if (err) return res.status(500).send({ message: 'Failed request' })
        if (!driverDeleted) return res.status(404).send({ message: 'Driver not found!' })
        return res.status(200).send({ message: 'Driver deleted successfully!' })
    })
}



module.exports = {
    saveDriver,
    getDrivers,
    updateDriver,
    deleteDriver
};
