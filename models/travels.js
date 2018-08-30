"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let travelSchema = Schema({
    addressOrigin: String,
    addressDestination: String,
    latOrigin: Number,
    lngOrigin: Number,
    latDestination: Number,
    lngDestination: Number,
    vehilcelId:String,
    driverId:String
});

module.exports = mongoose.model("Travel", travelSchema);
