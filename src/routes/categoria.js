const express = require("express");
const router = express.Router();
const { models } = require("../libs/sequelize");

const Categoria = models.Categoria;

// GET todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST crear nueva categoría
router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaCategoria = await Categoria.create({ nombre });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;