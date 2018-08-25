"use strict";

const express = require("express");
const userCtrl = require("../controllers/user");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");

api.get("/prueba", md_auth.ensureAuth, userCtrl.prueba);
api.post("/register", userCtrl.saveUser);
api.post("/login", userCtrl.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,userCtrl.updateUser)
api.delete('/user/:id',md_auth.ensureAuth,userCtrl.deleteUser)

module.exports = api;
