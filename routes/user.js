"use strict";

const express = require("express");
const userCtrl = require("../controllers/user");

let api = express.Router();
let md_auth = require("../middlewares/authenticated");
const multipart=require('connect-multiparty')
const md_upload=multipart({uploadDir:'./uploads/users'})



api.get("/prueba", md_auth.ensureAuth, userCtrl.prueba);
api.post("/register", userCtrl.saveUser);
api.post("/login", userCtrl.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,userCtrl.updateUser)
api.delete('/user/:id',md_auth.ensureAuth,userCtrl.deleteUser)
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],userCtrl.uploadImage)
api.get('/get-image-user/:imageFile',userCtrl.getImageFile)


module.exports = api;
