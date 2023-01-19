require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');

// app.use(express.static(__dirname + "/public"))

app.use(
    cors({
        origin:["https://mern-jobster-authentication-front.onrender.com"],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }) 
);

// "http://localhost:3000", 


// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname , "./public/data.html"))
// })



//* Errors Handler
app.use(express.json())
const NotFound = require("./middleware/not-found-error")
const ErrorHandler = require("./middleware/error-handler")



//* connectDB
const connectDB = require("./db/ConnectDB")




//* Routers
const userRouter  = require("./routes/User")
const jobRouter = require("./routes/Job")
const authenticate = require("./middleware/AuthenticationUser")




//* routes
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/jobs", authenticate, jobRouter)





app.use(NotFound)
app.use(ErrorHandler)










function connect() {
 
    try {

        const port = process.env.PORT || 3001
 
        connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log("Connect to the Server port " + port ))

    } catch(err) {
        console.log(err); 
    }

}

connect()





// https://mern-jobster-authentication-api.onrender.com
// https://mern-jobster-authentication-front.onrender.com/

// mern-jobster-authentication
// proxy": "http://localhost:8080",

//- Deploying MERN Stack App to Heroku - MERN Stack Tutorial with Redux #15

// "proxy": "https://mern-jobster-authentication-backend.onrender.com",
 