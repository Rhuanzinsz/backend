const Livro = require('../models/LivroModel');
const { livroSchema, updateLivroSchema } = require('../validations/livroValidation');

const LivroController = {
    // Criar um novo livro
    create: async (req, res) => {
        try {
            // Validação dos dados
            const { error } = livroSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ msg: error.details[0].message });
            }

            const novoLivro = new Livro(req.body);
            await novoLivro.save();

            res.status(201).json(novoLivro);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao criar livro.' });
        }
    },

    // Listar todos os livros
    getAll: async (req, res) => {
        try {
            const livros = await Livro.find().populate('autor', 'nome'); // Popula o nome do autor
            res.json(livros);
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: 'Erro ao buscar livros.' });
        }
    },

    // Buscar livro por ID
    getById: async (req, res) => {
        try {
            const livro = await Livro.findById(req.params.id).populate('autor', 'nome biografia');
            if (!livro) {
                return res.status(404).json({ msg: 'Livro não encontrado.' });
            }
            res.json(livro);
        } catch (error) {
            console.error(error);
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ msg: 'ID inválido.' });
            }
            res.status(500).json({ msg: 'Erro ao buscar livro.' });
        }
    },

    // Atualizar livro
    update: async (req, res) => {
        try {
            // Validação dos dados
            const { error } = updateLivroSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ msg: error.details[0].message });
            }

            const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!livro) {
                return res.status(404).json({ msg: 'Livro não encontrado.' });
            }
            res.json(livro);
        } catch (error) {
            console.error(error);
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ msg: 'ID inválido.' });
            }
            res.status(500).json({ msg: 'Erro ao atualizar livro.' });
        }
    },

    // Deletar livro
    delete: async (req, res) => {
        try {
            const livro = await Livro.findByIdAndDelete(req.params.id);
            if (!livro) {
                return res.status(404).json({ msg: 'Livro não encontrado.' });
            }
            res.json({ msg: 'Livro removido com sucesso.' });
        } catch (error) {
            console.error(error);
            if (error.kind === 'ObjectId') {
                return res.status(400).json({ msg: 'ID inválido.' });
            }
            res.status(500).json({ msg: 'Erro ao remover livro.' });
        }
    }
};

module.exports = LivroController;
