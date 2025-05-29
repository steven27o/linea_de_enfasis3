const BoletinService = require("../services/boletin");

const boletinValidator = async (request, response, next) => {
    const boletinService = new BoletinService();
    const id = request.params.id;

    try {
        const boletin = await boletinService.getById(id);

        if (!boletin) {
            return response.status(404).json({ error: "Boletín no encontrado" });
        }

        next();
    } catch (error) {
        console.error("Error en boletinValidator:", error);
        response.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = boletinValidator;
