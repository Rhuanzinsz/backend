const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/LivroController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Livro:
 *       type: object
 *       required:
 *         - titulo
 *         - autor
 *       properties:
 *         id:
 *           type: string
 *           description: O ID auto-gerado do livro
 *         titulo:
 *           type: string
 *           description: O título do livro
 *         autor:
 *           type: string
 *           description: O ID do autor do livro
 *         anoPublicacao:
 *           type: number
 *           description: O ano de publicação
 *         categoria:
 *           type: string
 *           description: A categoria do livro
 *         disponivel:
 *           type: boolean
 *           description: Se o livro está disponível
 *       example:
 *         titulo: O Senhor dos Anéis
 *         autor: 60d0fe4f5311236168a109ca
 *         anoPublicacao: 1954
 *         categoria: Fantasia
 *         disponivel: true
 */

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: API de gerenciamento de livros
 */

/**
 * @swagger
 * /api/livros:
 *   get:
 *     summary: Retorna a lista de todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: A lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get('/', LivroController.getAll);

/**
 * @swagger
 * /api/livros/{id}:
 *   get:
 *     summary: Retorna um livro pelo ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do livro
 *     responses:
 *       200:
 *         description: Detalhes do livro
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', LivroController.getById);

/**
 * @swagger
 * /api/livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *     responses:
 *       201:
 *         description: O livro foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, LivroController.create);

/**
 * @swagger
 * /api/livros/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *     responses:
 *       200:
 *         description: O livro foi atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', authMiddleware, LivroController.update);

/**
 * @swagger
 * /api/livros/{id}:
 *   delete:
 *     summary: Remove um livro
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do livro
 *     responses:
 *       200:
 *         description: O livro foi removido
 *       404:
 *         description: Livro não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', authMiddleware, LivroController.delete);

module.exports = router;
