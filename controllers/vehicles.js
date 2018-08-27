"use strict";

const Vehicle = require("../models/vehicles");



function saveVehicle(req, res) {
    let params = req.body;
    let vehicle = new Vehicle();
    console.log(params);

    if (params.type && params.plates && params.brand && params.model) {
        vehicle.type = params.type,
        vehicle.plates = params.plates,
        vehicle.soat = params.soat,
        vehicle.brand = params.brand,
        vehicle.model = params.model
        vehicle.status = params.status,
        vehicle.driverId=params.driverId
        //control vehicle duplicated
        Vehicle.find({ plates: vehicle.plates.toLowerCase() }).exec((err, vehicles) => {
            if (err) { return res.status(500).send({ message: 'Error in the request vehicle' }) }
            if (vehicles && vehicles.length >= 1) {
                return res.status(404).send({ message: 'Vehicle already exists' })
            } else {
                    vehicle.save(
                        (err,
                            vehicleStored) => {
                            console.log('vehicletored: ', vehicleStored);
                            if (err) {
                                return res.status(500).send({ message: "Failed to save data" });
                            }
                            if (vehicleStored) {
                                res.status(200).send({ data: vehicleStored});
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

function getVehicles(req,res){
    Vehicle.find({},(err, vehicles) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' })
        if (!vehicles) return res.status(404).send({ message: 'No te sigue ningun usuario' })
        return res.status(200).send({
            data:vehicles
        })
    })
}



function updateVehicle(req, res) {
    let vehicleId = req.params.id
    let update = req.body

    Vehicle.findByIdAndUpdate(vehicleId, update, { new: true }, (err, vehicleUpdated) => {
        if (err) return res.status(500).send({ message: 'Error in the request' })
        if (!vehicleUpdated) return res.status(404).send({ message: 'Vehicle could not be updated' })
        vehicleUpdated.password=undefined
        return res.status(200).send({ data: vehicleUpdated})
    })
}

function deleteVehicle(req, res) {
    let userId = req.params.id
    let update = req.body

    delete update.password

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permisos para actualizar los datos del usuario' })
    }

    User.findByIdAndRemove(userId, (err, userDeleted) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' })
        if (!userDeleted) return res.status(404).send({ message: 'No se ha podido Eliminar el usuario' })
        return res.status(200).send({ user: userDeleted })
    })
}



module.exports = {
    saveVehicle,
    getVehicles,
    updateVehicle
};
