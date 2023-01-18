const UserModel = require("../model/User") 
const{ BadRequest, UnAuthenticate } = require("../errors/index")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const getAllUsers = async (req, res) => {
    const user = await UserModel.find({})

    res.status(200).json({ user })
}



const register = async (req, res) => {
    const{ name, email, password } = req.body

    // const salt = await bcrypt.genSalt(10)
    // const hashPassword = await bcrypt.hash(password, salt)


    const user = await UserModel.create(req.body)
    const token = user.createJWT()

    res.status(201).json({ result:"user created",  user: {name: user.name} })
    // res.status(201).json({ user: {name: user.name}, token })
    // res.status(201).redirect("/api/v1/auth/login")
    // console.log(user, token);
}





const login = async (req, res) => {
    const{ email, password } = req.body

    const user = await UserModel.findOne({ email })


    if(!email && !password) throw new BadRequest("please provide email and password")
    if(!email) throw new BadRequest("please provide email")
    if(!password) throw new BadRequest("please provide password")
    if(!user) throw new UnAuthenticate(`thers is no email by ${email}`)
    

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) throw new UnAuthenticate('wrong password please try again')

    // console.log(isPasswordCorrect);

    const token =  user.createJWT()
    res.status(200).json({ user: {name: user.name}, token })
    
}




const deleteUser = async (req, res) => {
    const DeleteAllUser = await UserModel.deleteOne({})
    
    res.status(200).json({ DeleteAllUser })
}








module.exports = {
    register, login, deleteUser, getAllUsers
}