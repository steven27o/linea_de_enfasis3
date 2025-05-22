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
    response.send("backend running...")
})

app.use('/api/boletines', require('./routes/boletin') )

const PORT = process.env.APP_PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} `)
})

