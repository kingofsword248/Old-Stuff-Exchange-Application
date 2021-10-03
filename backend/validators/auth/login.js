const { body } = require("express-validator");

exports.rules = (() => {
  return [body("userName").notEmpty(), body("password").notEmpty()];
})();
