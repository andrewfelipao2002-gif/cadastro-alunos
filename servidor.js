// Importa o Express, a biblioteca que cria o servidor
const express = require("express");

// Cria a aplicação (o servidor)
const app = express();

// Permite que o servidor entenda dados enviados em JSON
app.use(express.json());

// Entrega os arquivos da pasta (index.html, style.css, script.js) ao navegador
app.use(express.static(__dirname));

// Array que guarda os alunos na memória (some quando o servidor reinicia)
const alunos = [];

// Contador que gera um id único para cada aluno novo
let proximoId = 1;

// Rota POST: recebe um aluno novo enviado pelo formulário
app.post("/alunos", (req, res) => {
// Pega os 4 campos enviados e remove espaços das pontas (se vier vazio, vira texto vazio)
const nome = String(req.body.nome || "").trim();
const idade = Number(req.body.idade);
const email = String(req.body.email || "").trim();
const curso = String(req.body.curso || "").trim();

// Se faltar algum campo, recusa com erro 400 (requisição inválida)
if (!nome || !email || !curso) {
    return res.status(400).json({ mensagem: "Preencha nome, e-mail e curso." });
}

// A idade precisa ser um número entre 1 e 120
if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
    return res.status(400).json({ mensagem: "Informe uma idade válida (1 a 120)." });
}

// O e-mail precisa ter pelo menos um "@" e um "." depois dele
if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ mensagem: "Informe um e-mail válido." });
}
    // Monta o aluno com um id e os 4 dados que vieram na requisição
       // Monta o aluno com um id e os dados já validados e limpos
    const aluno = {
        id: proximoId++,   // Usa o id atual e depois soma 1
        nome: nome,
        idade: idade,
        email: email,
        curso: curso
    };

    // Guarda o aluno no array
    alunos.push(aluno);

    // Responde ao navegador com uma mensagem e o aluno cadastrado
    res.json({
        mensagem: "Aluno cadastrado com sucesso!",
        aluno: aluno
    });
});

// Rota GET: devolve a lista de todos os alunos cadastrados
app.get("/alunos", (req, res) => {
    res.json(alunos);
});

// Rota DELETE: remove o aluno cujo id vem no endereço (ex.: /alunos/3)
app.delete("/alunos/:id", (req, res) => {

    // Converte o id do endereço (texto) para número
    const id = Number(req.params.id);

    // Procura a posição do aluno no array (-1 se não achar)
    const posicao = alunos.findIndex(function(aluno) {
        return aluno.id === id;
    });

    // Se não encontrou, responde com erro 404
    if (posicao === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
    }

    // Remove 1 aluno a partir dessa posição
    alunos.splice(posicao, 1);

    res.json({ mensagem: "Aluno excluído com sucesso!" });
});

// Liga o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});