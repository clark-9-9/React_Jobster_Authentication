const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "please provide name"],
        minLength:3, 
        maxLength:50
    }, 

    email: {
        type:String,
        required:[true, "please provide email"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide valid email"
        ],
        // ? unique ---> this means you cant have the same email and give it an index
        unique:true 
    }, 

    password: {
        type:String,
        required:[true, "please provide password"],
        minLength:6, 
    }, 

})


UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})


UserSchema.methods.createJWT = function() {
    const payload = jwt.sign(
        {userId: this._id, name: this.name},
        process.env.SECRET,
        {expiresIn: "30d"}
    )

    return payload
}


UserSchema.method("comparePassword", async function(SecretPassword) {
    const compare = await bcrypt.compare(SecretPassword, this.password)
    return compare
})


module.exports = mongoose.model("User", UserSchema)