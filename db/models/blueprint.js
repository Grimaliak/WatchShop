const path = require("path");
const fs = require("fs/promises");
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blueprint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client }) {
      this.belongsTo(Client, { foreignKey: 'client_id' });
    }
  }
  Blueprint.init({
    path: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Blueprint',
    hooks: {
      afterDestroy: async (image, options) => {
        console.log(`removing ${path.resolve("public", image.path)}`);
        await fs.unlink(path.resolve("public", image.path));
      }
    }
  });
  return Blueprint;
};
