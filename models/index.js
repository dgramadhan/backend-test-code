const dbConfig = require('../config/database.config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : dbConfig.dialect
})
const db = {
    Sequelize : Sequelize,
    sequelize : sequelize
}

db.users = require("./users.model")(sequelize, Sequelize);

module.exports = db;