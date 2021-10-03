const User = require("../models").User;
const jwt = require("jsonwebtoken");
const config = require("../config/app");

const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        userName,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found!" });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Incorrect password" });
    const userWithToken = generateToken(user.get({ raw: true }));
    return res.send(userWithToken);
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { userName } = req.body;
    const userExists = await User.findOne({
      where: {
        userName: userName,
      },
    });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create(req.body);
    const userWithToken = generateToken(user.get({ raw: true }));
    return res.send(userWithToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });
  if (user) {
    res.json({
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

const generateToken = (user) => {
  delete user.password;
  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 });
  return { ...user, ...{ token } };
};

module.exports = { login, register, getUserProfile };
