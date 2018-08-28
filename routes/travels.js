"use strict";

const express = require("express");
const travelCtrl = require("../controllers/travels");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");



api.post("/driver",md_auth.ensureAuth, travelCtrl.saveTravel);
api.get("/drivers",md_auth.ensureAuth,travelCtrl.getTravel);
api.put('/driver/:id',md_auth.ensureAuth,travelCtrl.updateTravel)
api.delete('/driver/:id',md_auth.ensureAuth,travelCtrl.deleteTravel)
// api.post("/login", userCtrl.loginUser);
// api.put('/update-user/:id',md_auth.ensureAuth,userCtrl.updateUser)


module.exports = api;
