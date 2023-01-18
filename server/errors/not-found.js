const CustomAPIError = require("./custom-api")


class NotFound extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = 404
    }

}

module.exports = NotFound
