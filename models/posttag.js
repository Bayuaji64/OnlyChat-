'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posttag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Posttag.belongsToMany(Post)
      Posttag.belongsToMany(models.Post,{as:'id',through:'PostId'})
      Posttag.belongsToMany(models.Tag,{as:'id',through:'TagId'})
    }
  }
  Posttag.init({
    PostId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posttag',
  });
  return Posttag;
};