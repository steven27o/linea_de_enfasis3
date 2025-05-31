const { sequelize, models } = require('../libs/sequelize');

async function seedCategorias() {
  await sequelize.sync({ force: true });

  await models.Categoria.bulkCreate([
    { nombre: 'Noticias' },
    { nombre: 'Eventos' },
    { nombre: 'Avisos' }
  ]);

  console.log("✅ Categorías insertadas");
  process.exit();
}

seedCategorias();