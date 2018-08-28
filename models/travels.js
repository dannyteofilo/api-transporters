"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let driverSchema = Schema({
    nameOrigin: String,
    nameDestination: String,
    latOrigin: String,
    lngDestination: String,
    latDestination: String,
    lngDestination: String,
    vehilcelId:String,
    driverId:String
});

module.exports = mongoose.model("Driver", driverSchema);
