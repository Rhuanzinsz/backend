// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');

// Configura as variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');

// Configurações básicas
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor da Biblioteca está rodando!');
});

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // 1. Tenta conectar ao MongoDB
    await connectDB();

    // 2. Só liga o servidor DEPOIS que o banco conectar
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("Falha ao iniciar o servidor, verifique o banco de dados:", error.message);
    process.exit(1); // Encerra a aplicação se o banco não conectar
  }
  app.use(express.json());
  app.use('/auth', authRoutes);
  app.use('/api/livros', livroRoutes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};

// Inicia o servidor
startServer();