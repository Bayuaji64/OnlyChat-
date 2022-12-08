'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      
    }
  }
  User.init({
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          
          msg:"Input your username please!!"
        },
        notEmpty:{
          msg:'Input your username please!!'
        }
        
      }
      
      
      
      
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          
          msg:"Input your password please!!"
        },
        notEmpty:{
          msg:'Input your password please!!'
        }
        
        
      }
      
      
      
    },
    role: DataTypes.STRING
  }, {


    hooks:{
      beforeCreate : (instance, options) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);
        instance.password= hash
        
      }
    },
    sequelize,
    modelName: 'User'
  });
  
  return User;
};