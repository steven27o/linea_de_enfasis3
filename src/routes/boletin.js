const { Router } = require('express');
const BoletinService = require("../services/boletin");

const router = Router();
const serviceBoletin = new BoletinService();

router.get("/", async (request, response) => {
    try {
        const boletines = await serviceBoletin.getAll();

        const boletinResponse = boletines.map((bol) => {
            return bol.getValues(); // Asegúrate de que getValues() existe
        });

        response.json(boletinResponse);
    } catch (error) {
        console.error("Error al obtener los boletines:", error);
        response.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
