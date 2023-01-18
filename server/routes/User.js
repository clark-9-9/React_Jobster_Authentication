const express = require('express')
const router = express.Router()

const {
    register, login, deleteUser, getAllUsers
} = require("../controllers/User")


router.get("/", getAllUsers)
router.post("/register", register)
router.post("/login", login)
router.delete("/register/:id", deleteUser)




module.exports = router