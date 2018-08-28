"use strict";

const Travel = require("../models/travels.js");



function saveTravel(req, res) {
    let params = req.body;
    let travel = new Travel();
    console.log(params);

    if (params.type && params.plates && params.brand && params.model) {
        travel.type = params.type
        travel.addressOrigin = params.addressOrigin
        travel.addressDestination = params.addressDestination
        travel.latOrigin = params.latOrigin
        travel.lngOrogin = params.lngOrogin
        travel.latDestination = params.latDestination
        travel.lngDestination = params.lngDestination
        travel.vehilcelId = params.vehilcelId
        travel.driverId = params.driverId
        //control travel duplicated
        Driver.find({ plates: travel.plates.toLowerCase() }).exec((err, travels) => {
            if (err) { return res.status(500).send({ message: 'Error in the request' }) }
            if (travels && travels.length >= 1) {
                return res.status(404).send({ message: 'Driver already exists' })
            } else {
                travel.save(
                    (err,
                        travelStored) => {
                        console.log('traveltored: ', travelStored);
                        if (err) {
                            return res.status(500).send({ message: "Failed to save data" });
                        }
                        if (travelStored) {
                            res.status(200).send({ data: travelStored });
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

function getTravel(req, res) {
    Travel.find({}, (err, travels) => {
        if (err) return res.status(500).send({ message: 'Error in the request' })
        if (!travels) return res.status(404).send({ message: 'Travels not found' })
        return res.status(200).send({
            data: travels
        })
    })
}



function updateTravel(req, res) {
    let travelId = req.params.id
    let update = req.body

    Travel.findByIdAndUpdate(travelId, update, { new: true }, (err, travelUpdated) => {
        if (err) return res.status(500).send({ message: 'Error in the request' })
        if (!travelUpdated) return res.status(404).send({ message: 'Travel could not be updated' })
        return res.status(200).send({ data: travelUpdated })
    })
}

function deleteTravel(req, res) {
    let travleId = req.params.id

    Travel.findByIdAndRemove(travleId, (err, driverDeleted) => {
        if (err) return res.status(500).send({ message: 'Failed request' })
        if (!driverDeleted) return res.status(404).send({ message: 'Travel not found!' })
        return res.status(200).send({ message: 'Travel deleted successfully!' })
    })
}



module.exports = {
    saveTravel,
    getTravel,
    updateTravel,
    deleteTravel
};