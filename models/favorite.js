'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favorite.belongsTo(models.user)
    }
  }
  favorite.init({
    userId: DataTypes.INTEGER,
    parkCode: DataTypes.STRING,
    fullName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favorite',
  });
  return favorite;
};