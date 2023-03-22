const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express()
const port = process.env.PORT;
const db = require("./models")
const Users = db.users
const { userSeed } = require("./seeder/users.seeder")

app.listen (port, () => {
    console.log(`Server running on port ${port}`)
})

db.sequelize.sync()
    .then( async () => {
        console.log("Database Sync")
        Users.bulkCreate(await userSeed(), { updateOnDuplicate: ['password'], ignoreDuplicates: true})
            .then(() => console.log("Users Added"));
    })
    .catch((err) => {
        console.log("Gagal Sync DB : " + err.message)
    })


require("./routes/users.routes")(app)