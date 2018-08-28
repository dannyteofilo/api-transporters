"use strict";

const Driver = require("../models/vehicles");



function saveDriver(req, res) {
    let params = req.body;
    let vehicle = new Driver();
    console.log(params);

    if (params.type && params.plates && params.brand && params.model) {
        vehicle.type = params.type
        vehicle.plates = params.plates
        vehicle.soat = params.soat
        vehicle.brand = params.brand
        vehicle.model = params.model
        vehicle.status = params.status
        vehicle.driverId = params.driverId
        //control vehicle duplicated
        Driver.find({ plates: vehicle.plates.toLowerCase() }).exec((err, vehicles) => {
            if (err) { return res.status(500).send({ message: 'Error in the request' }) }
            if (vehicles && vehicles.length >= 1) {
                return res.status(404).send({ message: 'Driver already exists' })
            } else {
                vehicle.save(
                    (err,
                        vehicleStored) => {
                        console.log('vehicletored: ', vehicleStored);
                        if (err) {
                            return res.status(500).send({ message: "Failed to save data" });
                        }
                        if (vehicleStored) {
                            res.status(200).send({ data: vehicleStored });
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
        return res.status(200).send({ data: driverUpdated })
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
