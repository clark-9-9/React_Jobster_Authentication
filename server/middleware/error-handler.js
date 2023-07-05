const CustomAPIError = require("../errors/custom-api")

function ErrorHandler(err, req, res, next) {
    
    console.log(err);

    if(err instanceof CustomAPIError) {
        res.status(err.StatusCode).json({ msg:err.message })
    }

    return res.status(500).json({ err })
}

module.exports = ErrorHandler
