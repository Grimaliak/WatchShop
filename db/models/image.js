const fs = require("fs/promises");
const path = require("path");
const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Watch }) {
      this.belongsTo(Watch, { foreignKey: 'watch_id' });
    }
  }
  Image.init({
    path: DataTypes.STRING,
    watch_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Image',
    hooks: {
      afterDestroy: async (image, options) => {
        console.log(`removing ${path.resolve("public", image.path)}`);
        await fs.unlink(path.resolve("public", image.path));
      }
    }
  });
  return Image;
};
