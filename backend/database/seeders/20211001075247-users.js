"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        userName: "leo",
        password: bcrypt.hashSync("secret", 10),
        role: "user",
        address: "District 8",
        phone: "02368566114",
        fullName: "Toàn",
        gender: "male",
        dob: "1995-07-12",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
