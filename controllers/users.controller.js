const db = require("../models")
const Users = db.users
const Op = db.Sequelize.Op
const tokenGenrate = require("../helpers/jwt.helpers")
const passwordHash = require("../helpers/encrypt.helpers")

exports.signUp = async (req, res) => {
    try {
        var data = await Users.findOne({
            where : { username : req.body.username}
        })
        if (data) {
            return res.status(409).send({ "status": "gagal", "pesan": "User already exists" })
        }

        await Users.create({
            username: req.body.username,
            password: await passwordHash.encrypt(req.body.password),
            fullname: req.body.fullname
        })
        .then(() => {
            return res.status(200).send({ "status": "success", "pesan": "data berhasil ditambahkan" })
        })
        .catch(err => {
            return res.status(400).send({ "status": "gagal", "pesan": "data gagal ditambahkan" + err })
        })

    } catch (error) {
        return res.status(500).send({ "status": "gagal", "pesan": "Server Internal Error" + err })
    }
   
  
}

exports.logIn = (req, res) => {
    Users.findOne({
        where: { username: req.body.username }
    })
    .then(async (data) => {
        let comparePass = await passwordHash.comparePass(req.body.password, data.password)
        let token = tokenGenrate.generateToken(data)

        if (comparePass) {
            return res.status(200).send({ "status": "success", "pesan": "berhasil login", "token": token  })
        } else {
            return res.status(400).send({ "status": "gagal", "pesan": "gagal login"  })
        }
        
    })
    .catch(async () => {
        return res.status(400).send({ "status": "gagal", "pesan": "gagal login"  })
    })
}

exports.listUser = (req,res) => {
    Users.findAll()
    .then((data) => {
        if (data) {
            return res.status(200).send({ "status": "success", "data": data  })
        } else {
            return res.status(404).send({ "status": "gagal", "pesan": "not found"  })
        }
        
    })
    .catch(err => {
        return res.status(500).send({ "status": "gagal", "pesan": "error " + err })
    })
}

exports.listUserLimit = (req, res) => {
    Users.findAll({
        limit : parseInt(req.query.limit),
        offset :(parseInt(req.query.limit) * (parseInt(req.query.page) - 1))
    })
    .then(async (data) => {
        if (data != 0) {
            let total = await Users.count()
            return res.status(200).send({ "status": "success", "data": data,
                "limit": parseInt(req.query.limit), "page": parseInt(req.query.page), "total": total  })
        } else {
            return res.status(404).send({ "status": "gagal", "pesan": "not found"  })
        }
        
    })
    .catch(err => {
        return res.status(500).send({ "status": "gagal", "pesan": "error" + err })
    })
}