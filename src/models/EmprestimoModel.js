// src/models/EmprestimoModel.js
const mongoose = require('mongoose');

const EmprestimoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // modelo Usuario
    required: true
  },
  livro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livro', // modelo Livro
    required: true
  },
  dataEmprestimo: {
    type: Date,
    default: Date.now // data de agora
  },
  dataDevolucao: {
    type: Date,
    required: false // Opcional
  }
}, { timestamps: true });

const Emprestimo = mongoose.model('Emprestimo', EmprestimoSchema);

module.exports = Emprestimo;