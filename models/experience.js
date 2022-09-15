'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.experience.belongsTo(models.user)
    }
  }
  experience.init({
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    parkCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'experience',
  });
  return experience;
};