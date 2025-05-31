const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./libs/sequelize");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (request, response) => {
    response.send("Backend running...");
});

app.use("/api/boletines", require("./routes/boletin"));
app.use("/api/categoria", require("./routes/categoria"));  // <--- Agregado

const PORT = process.env.APP_PORT;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await sequelize.sync();
});