const jwt = require('jsonwebtoken')
const auth_config = require("../config/auth.config")

exports.generateToken = (data) => {
    let token = jwt.sign({data: data}, auth_config.secret_key, {expiresIn: 86400 })
    return token
}

exports.validationToken = (token) => {
    return verified = jwt.verify(token, auth_config.secret_key) ? true : false;
    
}