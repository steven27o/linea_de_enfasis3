const { models } = require("./../libs/sequelize");
const Boletin = require("./../models/boletin");

class BoletinService {
  async getAll() {
    const boletines = await models.Boletin.findAll();
    return boletines.map((row) => new Boletin(
      row.id,
      row.title,
      row.description,
      row.create_at,
      row.update_at,
      row.published_at
    ));
  }

  async getById(id) {
    const boletin = await models.Boletin.findByPk(id);
    if (!boletin) return null;

    return new Boletin(
      boletin.id,
      boletin.title,
      boletin.description,
      boletin.create_at,
      boletin.update_at,
      boletin.published_at
    );
  }

  // Aquí agregamos el parámetro categoria_id
  async create(title, description, published_at, categoria_id) {
    if (!categoria_id) {
      throw new Error("categoria_id es obligatorio");
    }

    const createBoletin = await models.Boletin.create({
      title,
      description,
      published_at,
      categoria_id,
    });

    return new Boletin(
      createBoletin.id,
      createBoletin.title,
      createBoletin.description,
      createBoletin.create_at,
      createBoletin.update_at,
      createBoletin.published_at
    );
  }

  async update(id, title, description, published_at) {
    const boletin = await models.Boletin.findByPk(id);
    if (!boletin) return null;

    await boletin.update({ title, description, published_at });

    return new Boletin(
      boletin.id,
      boletin.title,
      boletin.description,
      boletin.create_at,
      boletin.update_at,
      boletin.published_at
    );
  }

  async delete(id) {
    const boletin = await models.Boletin.findByPk(id);
    if (!boletin) return null;

    await boletin.destroy();
    return { message: "Boletín eliminado correctamente", id };
  }
}

module.exports = BoletinService;
