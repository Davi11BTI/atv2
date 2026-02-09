const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Configurações
app.use(cors()); // Permite conexões do frontend
app.use(express.json()); // Permite ler JSON no corpo das requisições

// "Banco de dados" em memória (para simplificar)
let produtos = [
    { id: 1, nome: "Notebook Gamer", preco: 4500.00 },
    { id: 2, nome: "Mouse Sem Fio", preco: 150.00 }
];

// --- ROTAS ---

// Rota 1: Mostrar os produtos (GET)
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Rota 2: Cadastrar produto (POST)
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    
    if (!nome || !preco) {
        return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
    }

    const novoProduto = {
        id: Date.now(), // Gera um ID único baseado no tempo
        nome,
        preco: parseFloat(preco)
    };

    produtos.push(novoProduto);
    console.log("Produto cadastrado:", novoProduto);
    
    res.status(201).json({ mensagem: "Produto criado com sucesso!", produto: novoProduto });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});