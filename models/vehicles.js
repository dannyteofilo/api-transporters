"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let vehicleSchema = Schema({
    type: String,
    plates: String,
    soat: Date,
    brand: String,
    model: String,
    status: Boolean,
    driverId:String
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
