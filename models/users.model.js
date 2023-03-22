module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey: true,
            
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING
        },
        fullname: {
            type: Sequelize.STRING,
        }
    })

    return Users
}