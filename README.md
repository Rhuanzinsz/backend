# Biblioteca Virtual API

API RESTful para gerenciamento de uma biblioteca virtual, desenvolvida com Node.js, Express e MongoDB.

## Funcionalidades

- **Autenticação**: Login e proteção de rotas com JWT.
- **Livros**: CRUD completo (Criar, Listar, Atualizar, Deletar) com validação de dados.
- **Documentação**: Swagger UI para explorar e testar a API.
- **Testes**: Testes unitários/integração com Jest e Supertest.

## Tecnologias

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Joi (Validação)
- Swagger (Documentação)
- Jest & Supertest (Testes)

## Configuração

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz com as seguintes variáveis (exemplo):
   ```env
   PORT=3000
   MONGO_URI=sua_string_de_conexao_mongodb
   JWT_SECRET=sua_chave_secreta
   ```

## Execução

- **Desenvolvimento**:
  ```bash
  npm run dev
  ```
- **Produção**:
  ```bash
  npm start
  ```

## Documentação (Swagger)

Após iniciar o servidor, acesse a documentação em:
`http://localhost:3000/api-docs`

## Testes

Para rodar os testes automatizados:
```bash
npm test
```
## Divisão de tarefas, 50% 50% dos issues

Rhuan responsavél pela criação conceitual do projeto, além da criação da colaboração do github e os 3 primeiros issues do projeto
André responsavél pelo commit final assim como a resuloção dos 3 ultimos issues do projeto, e a revisão final de todos os arquivos atuaizados para a postagem do trabalho

## Integrantes do Grupo

André Santos Fraga 2414290045
Rhuan Ferreira Avelino de Andrade 2414290046
