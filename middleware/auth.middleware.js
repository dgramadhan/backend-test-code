const authJwt = require("../helpers/jwt.helpers")

exports.verifyToken = async (req, res, next) => {
    try {
        let headerBearer = req.headers['authorization']
        if (!headerBearer) {
            return res.status(401).send({"status": "not authorization", "pesan": "tidak terdapat token"});
        }

        let bearer = headerBearer.split(' ')
        let token =  bearer[1]
        let verified = authJwt.validationToken(token);
        
        if (verified) {
            next();
        }
       
    } catch (error) {
        return res.status(401).send({"status": "not authorization", "pesan": "akses tidak terotorisasi"});
    }
}