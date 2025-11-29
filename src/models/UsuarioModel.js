// src/models/UsuarioModel.js
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // não existe dois usuários com o mesmo email
  },
  senha: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;