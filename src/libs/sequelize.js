const { Sequelize } = require("sequelize");
require("dotenv").config();

// Cargar variables de entorno
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const USER = encodeURIComponent(DB_USER);
const PASS = encodeURIComponent(DB_PASS);

// Construir URI
const URI = `mysql://${USER}:${PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;


const sequelize = new Sequelize(URI, {
  dialect: "mysql",
  logging: false,
});


const BoletinModel = require("../database/models/boletin")(sequelize);
const CategoriaModel = require("../database/models/categoria")(sequelize);


BoletinModel.associate?.({ Categoria: CategoriaModel });
CategoriaModel.associate?.({ Boletin: BoletinModel });


const models = {
  Boletin: BoletinModel,
  Categoria: CategoriaModel,
};

module.exports = { sequelize, models };
