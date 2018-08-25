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
    if (params.name && params.email && params.password) {
        user.name = params.name,
            user.lastName = params.lastName,
            user.email = params.email,
            user.password = params.password,
            user.role = 'ROLE_USER'
        user.image = null
        //control user duplicated
        User.find({ email: user.email.toLowerCase() }).exec((err, users) => {
            if (err) { return res.status(500).send({ message: 'Error in the request users' }) }
            if (users && users.length >= 1) {
                return res.status(404).send({ message: 'User already exists' })
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
                                res.status(200).send({ user: userStored, token: jwt.createToken(userStored) });
                            } else {
                                res.status(404).send({ message: "User has not registered" });
                            }
                        }
                    );
                });
            }
        })

    } else {
        res.status(403).send({ message: "Some data is required" });
    }
}

function loginUser(req, res) {
    let params = req.body
    let email = params.email
    let password = params.password

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return res.status(500).send({ message: 'Error in the request' })
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
                    return res.status(404).send({ message: 'User has not been able to identify, invalid password' })
                }
            })
        } else {
            return res.status(404).send({ message: 'User not found' })
        }
    })

}

function updateUser(req, res) {
    let userId = req.params.id
    let update = req.body

    delete update.password

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'You do not have permissions to update the user data' })
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error in the request' })
        if (!userUpdated) return res.status(404).send({ message: 'User could not be updated' })
        userUpdated.password=undefined
        return res.status(200).send({ user: userUpdated })
    })
}

function deleteUser(req, res) {
    let userId = req.params.id
    let update = req.body

    delete update.password

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permisos para actualizar los datos del usuario' })
    }

    User.findByIdAndRemove(userId, (err, userDeleted) => {
        if (err) return res.status(500).send({ message: 'Error en la petición' })
        if (!userDeleted) return res.status(404).send({ message: 'No se ha podido Eliminar el usuario' })
        return res.status(200).send({ user: userDeleted })
    })
}

module.exports = {
    prueba,
    saveUser,
    loginUser,
    updateUser,
    deleteUser
};
