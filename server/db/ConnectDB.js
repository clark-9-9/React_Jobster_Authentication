const mongoose = require("mongoose");


function connectDB(URL) {
    return mongoose.connect(URL, console.log("connected to DB"))
}


module.exports = connectDB