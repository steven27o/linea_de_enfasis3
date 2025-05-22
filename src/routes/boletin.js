const { Router, response, request } = require('express');
const BoletinService = require("../services/boletin")

const router = Router();
const serviceBoletin = new BoletinService();

router.get("/", async (request, response) => {
    const boletines = await serviceBoletin.getAll();

    const boletinResponse = boletines.map((bol) => {
        return bol.getValues();
    })

    response.json(boletinResponse);
});

router.get("/:id",async (request, response)=>{
    const id = request.params.id;
    const boletin = await serviceBoletin.getById(id);

    if (!boletin){
        response.status(404).send("Boletin not found");
        return;
    }

    response.json(boletin.getValues());
})
router.post("/",async(require, response)=>{
    const { title, description, published_at } = request.body;

    const boletin = await serviceBoletin.create(title,description,published_at);
    response.json(boletin.getValues());
})

router.put("/:id", async(request, response)=>{
    const id = request.params.id;
    const { title, description, published_at} = request.body;

    const boletin = await serviceBoletin.getById(id);

    if(!boletin){
        response.status(404).send("Boletin not found");
        return;
    }
    const updateBoletin = await serviceBoletin.update(id, title,description, published_at);
    response.json(updateBoletin.getValues());
})

module.exports = router;