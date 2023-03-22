const bcrypt = require("bcrypt")

exports.encrypt = async (password) => {
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)
    return passwordHash
}

exports.comparePass = async (passwordInput, passwordStore) => {
    let comparePass = await bcrypt.compare(passwordInput, passwordStore)
    return comparePass
}