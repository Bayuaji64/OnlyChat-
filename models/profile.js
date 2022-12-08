'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
    // Hook(){
    //   if
    //   this.fullName=
    //   this.dateOfiBirth= 

    // }
  }
  Profile.init({
    fullName:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{

          msg:"Name is Required!!"
        },
        notEmpty:{
          msg:'Name is Required!!'
        }
        
      }
      
      
    },
    dateOfBirth:{
      type:DataTypes.DATE,
      allowNull:false,
      // isBefore:"01-01-2015",
      validate:{
        notNull:{
          
          msg:"Insert you Age!!"
        },
        notEmpty:{
          msg:'Insert your Age!!'
        },
        // isBefore:{
        //   msg: "You're still young!!"
        // }
      

        

        
      }


    },
    imgProfile:{
     type: DataTypes.STRING,
     allowNull:false,
      
    },

    bio:{
      type:DataTypes.TEXT,
      allowNull:false

    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};