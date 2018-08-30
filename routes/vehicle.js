"use strict";

const express = require("express");
const vehicleCtrl = require("../controllers/vehicles");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");



api.post("/vehicle",md_auth.ensureAuth, vehicleCtrl.saveVehicle);
api.get("/vehicles",md_auth.ensureAuth,vehicleCtrl.getVehicles);
api.put('/vehicle/:id',md_auth.ensureAuth,vehicleCtrl.updateVehicle)
api.delete('/vehicle/:id',md_auth.ensureAuth,vehicleCtrl.deleteVehicle)


module.exports = api;
