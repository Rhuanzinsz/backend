// src/controllers/AuthController.js
const Usuario = require('../models/UsuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para Registar
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // 1. Verificar se já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'Este email já está registado.' });
    }

    // 2. Criptografar a palavra-passe
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // 3. Criar com a senha criptografada
    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash
    });

    await novoUsuario.save();

    res.status(201).json({ msg: 'Utilizador registado com sucesso!' });

  } catch (error) {
    res.status(500).json({ msg: 'Erro no servidor', erro: error.message });
  }
};

// Função para fazer Login
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Verificar se existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    // 2. Verificar a palavra-passe 
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas.' });
    }

    // 3. Gerar o Token 
    const payload = { id: usuario._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });

  } catch (error) {
    res.status(500).json({ msg: 'Erro no servidor', erro: error.message });
  }
};