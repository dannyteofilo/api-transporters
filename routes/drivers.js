"use strict";

const express = require("express");
const driverCtrl = require("../controllers/drivers");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");



api.post("/driver",md_auth.ensureAuth, driverCtrl.saveDriver);
api.get("/drivers",md_auth.ensureAuth,driverCtrl.getDrivers);
api.put('/driver/:id',md_auth.ensureAuth,driverCtrl.updateDriver)
api.delete('/driver/:id',md_auth.ensureAuth,driverCtrl.deleteDriver)
// api.post("/login", userCtrl.loginUser);
// api.put('/update-user/:id',md_auth.ensureAuth,userCtrl.updateUser)


module.exports = api;
