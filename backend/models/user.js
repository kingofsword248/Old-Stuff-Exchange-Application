"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

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
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(250),
      },
      role: {
        type: DataTypes.STRING(20),
      },
      address: {
        type: DataTypes.STRING(500),
      },
      phone: {
        type: DataTypes.STRING(15),
      },
      fullName: {
        type: DataTypes.STRING(100),
      },
      gender: {
        type: DataTypes.STRING(20),
      },
      dob: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: hashPassword,
        afterUpdate: hashPassword,
      },
    }
  );
  return User;
};

const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  return user;
};
