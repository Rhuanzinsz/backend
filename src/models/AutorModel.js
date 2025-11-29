// src/models/AutorModel.js
const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true // obrigatório
  },
  biografia: {
    type: String,
    required: false // opcional
  }
}, { timestamps: true }); // Adiciona 'createdAt' e 'updatedAt'

const Autor = mongoose.model('Autor', AutorSchema);

module.exports = Autor;