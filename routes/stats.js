"use strict";

const express = require("express");
const statsCtrl = require("../controllers/stats");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");



api.get("/stats",md_auth.ensureAuth, statsCtrl.init,statsCtrl.drivers,statsCtrl.travels);


module.exports = api;
