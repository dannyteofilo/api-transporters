"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let travelSchema = Schema({
    addressOrigin: String,
    addressDestination: String,
    latOrigin: String,
    lngOrogin: String,
    latDestination: String,
    lngDestination: String,
    vehilcelId:String,
    driverId:String
});

module.exports = mongoose.model("Travel", travelSchema);
