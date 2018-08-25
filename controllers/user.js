"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require('../services/jwt')

function prueba(req, res) {
    return res.status(200).send({ message: 'Hello' })
}

function saveUser(req, res) {
    let params = req.body;
    let user = new User();
    if (params.name && params.lastName && params.email && params.password) {
        user.name = params.name,
            user.lastName = params.lastName,
            user.email = params.email,
            user.password = params.password,
            user.role = 'ROLE_USER'
        user.image = null
        //control user duplicated
        User.find({ email: user.email.toLowerCase() }).exec((err, users) => {
            if (err) { return res.status(500).send({ message: 'Error en la peticion  de usuarios' }) }
            if (users && users.length >= 1) {
                return res.status(404).send({ message: 'El usuario ya existe' })
            } else {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                    user.save(
                        (err,
                            userStored) => {
                            console.log('userStored: ', userStored);
                            if (err) {
                                return res.status(500).send({ message: "Failed to save data" });
                            }
                            if (userStored) {
                                res.status(200).send({ user: userStored });
                            } else {
                                res.status(404).send({ message: "No se ha registrado el usuario" });
                            }
                        }
                    );
                });
            }
        })

    } else {
        res.status(200).send({ message: "Envía todos los datos" });
    }
}

function loginUser(req, res) {
    let params = req.body
    let email = params.email
    let password = params.password

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).send({ message: 'Error en la petición' })
        }

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    user.password = undefined
                    if (params.gettoken) {
                        return res.status(200).send({ user, token: jwt.createToken(user) })
                    } else {
                        return res.status(200).send({ user })
                    }
                } else {
                    return res.status(404).send({ message: 'El usuario no se ha podido identificar' })
                }
            })
        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar' })
        }
    })
}

module.exports = {
    prueba,
    saveUser,
    loginUser
};
