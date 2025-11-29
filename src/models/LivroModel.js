// src/models/LivroModel.js
const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true // obrigatório
  },

 autor: {
    type: mongoose.Schema.Types.ObjectId, // Salva o ID do autor
    ref: 'Autor', 
    required: true
  },
  anoPublicacao: {
    type: Number,
    required: false // opcional
  },
  categoria: {
    type: String,
    required: false // opcional
  },
  disponivel: {
    type: Boolean,
    default: true // padrão: true
  }
}, { timestamps: true }); // Adiciona 'createdAt' e 'updatedAt' 

const Livro = mongoose.model('Livro', LivroSchema);

module.exports = Livro;