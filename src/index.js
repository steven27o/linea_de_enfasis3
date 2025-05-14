const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

require ("dotenv").config()

const app = express();

//Middleware
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

app.get("/",(request,response)=>{
    response.send("Backend running...")
})

const PORT = process.env.APP_PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} `)
})