const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Boletin extends Model {
    static associate(models) {
      // Asociación con Categoria
      Boletin.belongsTo(models.Categoria, {
        foreignKey: "categoria_id",
        as: "categoria",
      });
    }
  }

  Boletin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categorias", // nombre exacto de la tabla categorias en tu DB
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Boletin",
      tableName: "boletines",
      timestamps: false,
    }
  );

  return Boletin;
};

