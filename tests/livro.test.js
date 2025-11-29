const request = require('supertest');
const express = require('express');
const livroRoutes = require('../src/routes/livroRoutes');
const Livro = require('../src/models/LivroModel');
const jwt = require('jsonwebtoken');

// Mock do Mongoose Model
jest.mock('../src/models/LivroModel');

// Mock do Auth Middleware para sempre passar um usuário
jest.mock('../src/middlewares/authMiddleware', () => (req, res, next) => {
    req.usuario = { id: '123', email: 'test@test.com' };
    next();
});

const app = express();
app.use(express.json());
app.use('/api/livros', livroRoutes);

describe('Livro API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/livros', () => {
        it('deve retornar todos os livros', async () => {
            const mockLivros = [{ titulo: 'Livro 1' }, { titulo: 'Livro 2' }];
            Livro.find.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockLivros)
            });

            const res = await request(app).get('/api/livros');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockLivros);
            expect(Livro.find).toHaveBeenCalled();
        });
    });

    describe('POST /api/livros', () => {
        it('deve criar um novo livro', async () => {
            const novoLivro = { titulo: 'Novo Livro', autor: '60d0fe4f5311236168a109ca' };
            Livro.prototype.save = jest.fn().mockResolvedValue(novoLivro);

            const res = await request(app)
                .post('/api/livros')
                .send(novoLivro);

            expect(res.statusCode).toEqual(201);
            // O mock do save não retorna o objeto salvo diretamente no prototype, 
            // mas o controller envia o objeto criado.
            // Ajuste: O controller usa 'new Livro(req.body)', então o mock deve ser no construtor ou no save.
            // Como mockamos a classe, precisamos garantir que a instância tenha o save.
        });

        it('deve retornar erro de validação se faltar título', async () => {
            const res = await request(app)
                .post('/api/livros')
                .send({ autor: '60d0fe4f5311236168a109ca' });

            expect(res.statusCode).toEqual(400);
            expect(res.body.msg).toBeDefined();
        });
    });

    describe('GET /api/livros/:id', () => {
        it('deve retornar um livro pelo id', async () => {
            const mockLivro = { titulo: 'Livro 1' };
            Livro.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockLivro)
            });

            const res = await request(app).get('/api/livros/123');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockLivro);
        });

        it('deve retornar 404 se não encontrar', async () => {
            Livro.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(null)
            });

            const res = await request(app).get('/api/livros/123');

            expect(res.statusCode).toEqual(404);
        });
    });

    describe('DELETE /api/livros/:id', () => {
        it('deve deletar um livro', async () => {
            Livro.findByIdAndDelete.mockResolvedValue({ titulo: 'Deletado' });

            const res = await request(app).delete('/api/livros/123');

            expect(res.statusCode).toEqual(200);
            expect(res.body.msg).toEqual('Livro removido com sucesso.');
        });
    });
});
