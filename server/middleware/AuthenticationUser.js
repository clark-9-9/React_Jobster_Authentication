const jwt = require("jsonwebtoken");
const { UnAuthenticate } = require("../errors/index");



const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnAuthenticate("Authentication invalid")
    } 

    
    try {

        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.SECRET)

        req.user = { userId: payload.userId, name: payload.name }
        next()

    } catch(err) {
        throw new UnAuthenticate("Authentication invalid")
        res.json(err)
    }

}



module.exports = authenticate