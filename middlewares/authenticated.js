"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const secret = "clave_secreta_transporters";

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "La petición no tiene la cabecera de autenticación" });
    }
    let payload = "";
    let token = req.headers.authorization.replace(/['"]+/g, "");
    try {
        payload = jwt.decode(token, secret);
        if (payload.exp <= moment.unix()) {
            return res.status(401).send({ message: "Token expired" });
        }
    } catch (ex) {
        return res.status(404).send({ message: "Token invalid" });
    }
    req.user = payload;
    next();
};
