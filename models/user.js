'use strict';
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
    sequelize,
    modelName: 'User',
  });
  return User;
};