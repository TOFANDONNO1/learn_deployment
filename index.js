const express=require('express');
const { connections } = require('./db');
const { auth } = require('./middleware/auth.middleware');
const { noteRouter } = require('./routes/note.routes');
const { userRouter } = require('./routes/user.routes');
const cors=require("cors")
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter)
app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try {
await connections
console.log("Connected To DB")
    } catch (error) {
        console.log(error)
        console.log("can't connect to DB")
    }
    console.log(`Server is Running at port ${process.env.port}`);
})