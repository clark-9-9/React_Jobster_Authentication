const CustomAPIError = require("./custom-api")


class UnAuthenticate extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCode = 401
    }

}

module.exports = UnAuthenticate
