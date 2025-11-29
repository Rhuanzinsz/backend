const Joi = require('joi');

const livroSchema = Joi.object({
    titulo: Joi.string().required().messages({
        'string.empty': 'O título é obrigatório',
        'any.required': 'O título é obrigatório'
    }),
    autor: Joi.string().required().messages({
        'string.empty': 'O ID do autor é obrigatório',
        'any.required': 'O ID do autor é obrigatório'
    }),
    anoPublicacao: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
    categoria: Joi.string().optional(),
    disponivel: Joi.boolean().optional()
});

const updateLivroSchema = Joi.object({
    titulo: Joi.string().optional(),
    autor: Joi.string().optional(),
    anoPublicacao: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
    categoria: Joi.string().optional(),
    disponivel: Joi.boolean().optional()
}).min(1); // Pelo menos um campo deve ser enviado para atualização

module.exports = {
    livroSchema,
    updateLivroSchema
};
