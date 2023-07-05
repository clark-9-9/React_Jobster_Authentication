const CustomAPIError = require("./custom-api")


class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = 400
    }

}

module.exports = BadRequest
