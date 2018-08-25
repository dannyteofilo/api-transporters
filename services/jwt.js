'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'clave_secreta_transporters'

exports.createToken = function (user) {
    let payload = {
        sub: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }

    return jwt.encode(payload, secret)
}
