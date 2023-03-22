const {  validationResult } = require("express-validator")

exports.check_validation = async (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
      } else {
        next()
      }
}