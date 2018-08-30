"use strict";

const Vehicle = require("../models/vehicles");



function saveVehicle(req, res) {
    let params = req.body;
    let vehicle = new Vehicle();

    if (params.type && params.plates && params.brand && params.model) {
        vehicle.type = params.type
        vehicle.plates = params.plates
        vehicle.soat = params.soat
        vehicle.brand = params.brand
        vehicle.model = params.model
        vehicle.status = params.status
        vehicle.driverId = params.driverId
        //control vehicle duplicated
        Vehicle.find({ plates: vehicle.plates}).exec((err, vehicles) => {
            if (err) { return res.status(500).send({ message: 'Error in the request vehicle' }) }
            if (vehicles && vehicles.length >= 1) {
                return res.status(404).send({ message: 'Vehicle already exists' })
            } else {
                vehicle.save(
                    (err,
                        vehicleStored) => {
                        if (err) {
                            return res.status(500).send({ message: "Failed to save data" });
                        }
                        if (vehicleStored) {
                            res.status(200).send({ message: 'Vehicle has been created' });
                        } else {
                            res.status(404).send({ message: "Vehicle has not registered" });
                        }
                    }
                );
            }
        })

    } else {
        res.status(403).send({ message: "Some data is required" });
    }
}

function getVehicles(req, res) {
    Vehicle.find({}, (err, vehicles) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' })
        if (!vehicles) return res.status(404).send({ message: 'No te sigue ningun usuario' })
        return res.status(200).send({
            data: vehicles
        })
    })
}



function updateVehicle(req, res) {
    let vehicleId = req.params.id
    let update = req.body

    Vehicle.findByIdAndUpdate(vehicleId, update, { new: true }, (err, vehicleUpdated) => {
        if (err) return res.status(500).send({ message: 'Error in the request' })
        if (!vehicleUpdated) return res.status(404).send({ message: 'Vehicle could not be updated' })
        vehicleUpdated.password = undefined
        return res.status(200).send({ message: 'Vehicle has been updated' })
    })
}

function deleteVehicle(req, res) {
    let vehicleId = req.params.id

    Vehicle.findByIdAndRemove(vehicleId, (err, vehicleDeleted) => {
        if (err) return res.status(500).send({ message: 'Failed request' })
        if (!vehicleDeleted) return res.status(404).send({ message: 'Vehicle not found!' })
        return res.status(200).send({ message: 'Vehicle deleted successfully!' })
    })
}



module.exports = {
    saveVehicle,
    getVehicles,
    updateVehicle,
    deleteVehicle
};
