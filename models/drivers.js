"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let driverSchema = Schema({
    name: String,
    lastName: String,
    numDocument: Number,
    typeDocument: String,
    role: String,
    image: String,
    vehicleId:String
});

module.exports = mongoose.model("Driver", driverSchema);
