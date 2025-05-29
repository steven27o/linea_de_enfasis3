const { Router } = require("express");
const BoletinService = require("../services/boletin");
const boletinValidator = require("../middleware/getByid");

const router = Router();
const serviceBoletin = new BoletinService();

// Obtener todos los boletines
router.get("/", async (req, res) => {
  try {
    const boletines = await serviceBoletin.getAll();
    const response = boletines.map(b => b.getValues());
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los boletines." });
  }
});

// Obtener uno por ID
router.get("/:id", boletinValidator, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const boletin = await serviceBoletin.getByid(id);
    res.json(boletin.getValues());
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el boletín." });
  }
});

// Crear boletín
router.post("/", async (req, res) => {
  try {
    const { title, description, published_at } = req.body;
    const nuevo = await serviceBoletin.create(title, description, published_at);
    res.status(201).json(nuevo.getValues());
  } catch (error) {
    res.status(500).json({ error: "Error al crear el boletín." });
  }
});

// Actualizar boletín
router.put("/:id", boletinValidator, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, published_at } = req.body;
    const boletinActualizado = await serviceBoletin.update(id, title, description, published_at);
    res.json(boletinActualizado.getValues());
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el boletín." });
  }
});

// Eliminar boletín
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await serviceBoletin.delete(id);
    res.json({ message: "Boletín eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el boletín." });
  }
});

module.exports = router;

