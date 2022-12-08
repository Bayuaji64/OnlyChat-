'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.hasMany(models.Posttag)
      // Post.belongsToMany(models.Posttag,{through:'PostId'})
      // Tag.belongsToMany(models.Post,{through:'Posttags'})
    }
  }
  Post.init({
    UserId: DataTypes.INTEGER,
    caption: DataTypes.TEXT,
    img: DataTypes.STRING,
    likeCount: DataTypes.INTEGER,
    dislikeCount: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate : (instance, options) => {
        instance.likeCount = 0
        instance.dislikeCount = 0
        
      }
    },
    sequelize,
    modelName: 'Post',
    
  });
  return Post;
};