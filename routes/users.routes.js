const { check } = require("express-validator");
const checkValidation = require("../validation/checker.validation")

module.exports = (app) => {
    const router = require("express").Router();
    var Users = require("../controllers/users.controller");
    const bodyParser = require("body-parser")
    const jsonParser = bodyParser.json();
    const verifyJwt = require("../middleware/auth.middleware")

    router.post("/auth/signup", 
        jsonParser, 
        [
            check("username","username harus diisi").notEmpty(),
            check("username","username minimal 2 karakter").isLength(2),
            check("password","password harus diisi").notEmpty(),
            check("password","password minimal 5 karakter").isLength(5),
        ],
        checkValidation.check_validation,
        Users.signUp)
    router.post("/auth/login", jsonParser, Users.logIn)
    router.get("/user/userlist", verifyJwt.verifyToken, Users.listUser)
    router.get("/user/userlist-page", verifyJwt.verifyToken, Users.listUserLimit)
    app.use("/", router)
}