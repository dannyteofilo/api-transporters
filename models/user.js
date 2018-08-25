"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    image: String
});

module.exports = mongoose.model("User", userSchema);
