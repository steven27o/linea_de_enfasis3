const { models } = require("./../libs/sequelize");
// Asumo que tu clase Boletin es una entidad simple sin lógica de Sequelize, por eso aquí no la usaremos para incluir relaciones.

class BoletinService {
  async getAll() {
    const boletines = await models.Boletin.findAll({
      include: {
        model: models.Categoria,
        as: "categoria",  // debe coincidir con el alias definido en el modelo
        attributes: ["id", "nombre"],  // campos que quieres traer de la categoría
      },
    });

    return boletines.map(b => ({
      id: b.id,
      title: b.title,
      description: b.description,
      create_at: b.create_at,
      update_at: b.update_at,
      published_at: b.published_at,
      categoria_id: b.categoria_id,
      
    }));
  }

  async getById(id) {
    const b = await models.Boletin.findByPk(id, {
      include: {
        model: models.Categoria,
        as: "categoria",
        attributes: ["id", "nombre"],
      },
    });
    if (!b) return null;

    return {
      id: b.id,
      title: b.title,
      description: b.description,
      create_at: b.create_at,
      update_at: b.update_at,
      published_at: b.published_at,
      categoria_id: b.categoria_id,
      
    };
  }

  // El resto de métodos create, update, delete igual
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

    return {
      id: createBoletin.id,
      title: createBoletin.title,
      description: createBoletin.description,
      create_at: createBoletin.create_at,
      update_at: createBoletin.update_at,
      published_at: createBoletin.published_at,
      categoria_id: createBoletin.categoria_id,
    };
  }

  async update(id, title, description, published_at) {
    const boletin = await models.Boletin.findByPk(id);
    if (!boletin) return null;

    await boletin.update({ title, description, published_at });

    return {
      id: boletin.id,
      title: boletin.title,
      description: boletin.description,
      create_at: boletin.create_at,
      update_at: boletin.update_at,
      published_at: boletin.published_at,
      categoria_id: boletin.categoria_id,
    };
  }

  async delete(id) {
    const boletin = await models.Boletin.findByPk(id);
    if (!boletin) return null;

    await boletin.destroy();
    return { message: "Boletín eliminado correctamente", id };
  }
}

module.exports = BoletinService;
