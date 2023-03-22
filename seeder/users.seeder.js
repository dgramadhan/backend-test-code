const passwordHash = require("../helpers/encrypt.helpers")

module.exports = {
    userSeed : async () => {
        var users = [ 
            { username: "test", password: await passwordHash.encrypt("yayaya"), fullname: "testing"},
            { username: "test1", password: await passwordHash.encrypt("test1"), fullname: "testing1"}
            ]
        
        return users
    }
    
} 
