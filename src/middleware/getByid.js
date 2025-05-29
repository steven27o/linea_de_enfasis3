const { request, response } = require("express");
const BoletinService = require("../services/boletin");

const boletinValidator = async (request, response, next) => {
    const boletinService = new BoletinService();

    const id = request.params.id;
    const boletin = await boletinService.getByid(id);

    if (!boletin) {
        response.status(404).send("boletin no found");
        return;
    }

    next();
}

module.exports = boletinValidator;