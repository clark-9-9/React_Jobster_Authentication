require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');


// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
//         allowedHeaders: ['Content-Type', 'Authorization']
//     }) 
// );


app.use(
    cors({
        origin:["http://localhost:3000", "https://mern-jobster-authentication-frontend.onrender.com"],
        methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], 
        allowedHeaders: ['Content-Type', 'Authorization']
    }) 
);





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

        const URI = process.env.MONGO_URI;

        if (!URI) throw new Error('MongoDB URI is not defined');
        connectDB(URI)
        app.listen(port, () => console.log("Connect to the Server port " + port ))

    } catch(err) {
        console.log(err); 
    }

}

connect()





