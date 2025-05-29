const { Router } = require('express');
const BoletinService = require("../services/boletin");
const boletinValidator = require("../middleware/getByid");

const router = Router();
const serviceBoletin = new BoletinService();

router.get("/", async (request, response) => {
    const boletines = await serviceBoletin.getAll();
    response.json(boletines.map(b => b.getValues()));
});

router.get("/:id", boletinValidator, async (request, response) => {
    const id = request.params.id;
    const boletin = await serviceBoletin.getById(id);
    response.json(boletin.getValues());
});

router.post("/", async (request, response) => {
    const { title, description, published_at } = request.body;
    const boletin = await serviceBoletin.create(title, description, published_at);
    response.json(boletin.getValues());
});

router.put("/:id", boletinValidator, async (request, response) => {
    const id = request.params.id;
    const { title, description, published_at } = request.body;
    const updatedBoletin = await serviceBoletin.update(id, title, description, published_at);
    response.json(updatedBoletin.getValues());
});

router.delete("/:id", boletinValidator, async (request, response) => {
    const id = parseInt(request.params.id);
    const result = await serviceBoletin.delete(id);
    response.json(result);
});

module.exports = router;


