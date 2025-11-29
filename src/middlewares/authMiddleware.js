// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 1. Ler o token
  const token = req.header('Authorization');

  // 2.barra a entrada
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
  }

  // 3.tenta validar
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    //guarda os dados do usuário na requisição
    req.usuario = decoded;
    
    next(); // Pode passar
    
  } catch (error) {
    res.status(400).json({ msg: 'Token inválido.' });
  }
};