'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // one user can have many role
      this.belongsToMany(models.Role, {
        through: 'User_Roles',
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  // we need to hash the password before saving it to database
  // User is the model (class), user is the record (instance) or a row in table
  User.beforeCreate((user) => {
    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;
  })
  return User;
};
