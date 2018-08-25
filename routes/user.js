"use strict";

const express = require("express");
const userCtrl = require("../controllers/user");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");

api.get("/prueba", md_auth.ensureAuth, userCtrl.prueba);
api.post("/register", userCtrl.saveUser);
api.post("/login", userCtrl.loginUser);

module.exports = api;
