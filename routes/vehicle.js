"use strict";

const express = require("express");
const vehicleCtrl = require("../controllers/vehicles");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");
// const multipart=require('connect-multiparty')
// const md_upload=multipart({uploadDir:'./uploads/users'})



api.post("/vehicle",md_auth.ensureAuth, vehicleCtrl.saveVehicle);
api.get("/vehicles",md_auth.ensureAuth,vehicleCtrl.getVehicles);
api.put('/vehicle/:id',md_auth.ensureAuth,vehicleCtrl.updateVehicle)
// api.post("/login", userCtrl.loginUser);
// api.put('/update-user/:id',md_auth.ensureAuth,userCtrl.updateUser)
// api.delete('/user/:id',md_auth.ensureAuth,userCtrl.deleteUser)


module.exports = api;
