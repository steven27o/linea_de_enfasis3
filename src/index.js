const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

require ("dotenv").config()

const app = express();

//Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

app.get("/",(request, response)=>{
    response.send("Backend runnig...")
})

const PORT = process.env.APP_PORT
app.listen(3000,()=>{
    console.log( `serve is running on port ${PORT}`)
})


