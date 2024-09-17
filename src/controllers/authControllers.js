const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Función para encriptar la contraseña
async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Función para comparar la contraseña
async function comparePassword(inputPassword, storedPassword) {
  return await bcrypt.compare(inputPassword, storedPassword);
}

// Función para generar un token JWT
function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 2, // 2 horas
  });
}

module.exports = {
  encryptPassword,
  comparePassword,
  generateToken,
};
