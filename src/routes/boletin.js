const { Router } = require("express");
const BoletinService = require("../services/boletin");
const boletinValidator = require("../middleware/getByid");

const router = Router();
const serviceBoletin = new BoletinService();

router.get("/", async (request, response) => {
  try {
    const boletines = await serviceBoletin.getAll();
    response.json(boletines);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.get("/:id", boletinValidator, async (request, response) => {
  try {
    const id = request.params.id;
    const boletin = await serviceBoletin.getById(id);
    if (!boletin) return response.status(404).json({ error: "Boletín no encontrado" });
    response.json(boletin);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  try {
    const { title, description, published_at, categoria_id } = request.body;

    if (!categoria_id) {
      return response.status(400).json({ error: "categoria_id es obligatorio" });
    }

    const boletin = await serviceBoletin.create(
      title,
      description,
      published_at,
      categoria_id
    );

    response.status(201).json(boletin);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.put("/:id", boletinValidator, async (request, response) => {
  try {
    const id = request.params.id;
    const { title, description, published_at } = request.body;
    const updatedBoletin = await serviceBoletin.update(id, title, description, published_at);
    if (!updatedBoletin) return response.status(404).json({ error: "Boletín no encontrado" });
    response.json(updatedBoletin);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.delete("/:id", boletinValidator, async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const result = await serviceBoletin.delete(id);
    if (!result) return response.status(404).json({ error: "Boletín no encontrado" });
    response.json(result);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

module.exports = router;


