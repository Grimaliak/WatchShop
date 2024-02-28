const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Watch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Image }) {
      this.hasMany(Image, { foreignKey: 'watch_id' });
    }
  }
  Watch.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Watch',
  });
  return Watch;
};
