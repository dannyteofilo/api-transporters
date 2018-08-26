"use strict";

const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require('../services/jwt')
const fs=require('fs')
const path = require('path')

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
        return res.status(200).send({ user: userUpdated,token:jwt.createToken(userUpdated) })
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

function uploadImage(req, res) {
    let userId = req.params.id
    if (req.files) {
        console.log('file>>>>>>>>>:' ,req.files);

        let file_split = req.files.image.path.split('\/')
        console.log(file_split);
        let file_name = file_split[2]
        console.log('name: ', file_name);
        if (userId != req.user.sub) {
            removeFile(res, req.files.image.path, 'No tienes permisos para actualizar los datos del usuario')
        } else {
            if (req.files.image.type == 'image/png' || req.files.image.type == 'image/jpg' || req.files.image.type == 'image/jpeg' || req.files.image.type == 'image/ggif') {
                User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdate) => {
                    if (err) {
                        res.status(500).send({ message: 'Error en la petición' })
                    } else {
                        if (!userUpdate) {
                            res.status(404).send({ message: 'No se ha podido actualizar el usuario' })
                        } else if (userUpdate) {
                            res.status(200).send({ user: userUpdate })
                        }
                    }
                })
            } else {
                removeFile(res, req.files.image.path, 'Extencion no valida')
            }
        }

    }
    else {
        res.status(404).send({ message: 'Not files' })
    }
}


function removeFile(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        if (!err) {
            res.status(200).send({ message: message })
        }
    })
}

function getImageFile(req, res) {
    let image_file = req.params.imageFile
    let path_file = './uploads/users/' + image_file
    fs.exists(path_file, (exist) => {
        if (exist) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ message: 'No existe la imágen' })
        }
    })
}

module.exports = {
    prueba,
    saveUser,
    loginUser,
    updateUser,
    deleteUser,
    uploadImage,
    getImageFile
};
