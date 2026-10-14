// Pega o formulário pelo id
const form = document.getElementById("formAluno");

// Pega a lista (<ul>) onde os alunos vão aparecer
const lista = document.getElementById("listaAlunos");

// Cria um <li> com os dados do aluno e coloca na lista
function mostrarAluno(aluno) {
    const item = document.createElement("li");
    item.textContent = `${aluno.nome} - ${aluno.idade} anos - ${aluno.email} - ${aluno.curso}`;
    lista.appendChild(item);
}

// Pede ao servidor todos os alunos cadastrados e mostra na tela
async function carregarAlunos() {
    const resposta = await fetch("/alunos");   // Requisição GET
    const alunos = await resposta.json();      // Converte o JSON em array

    lista.innerHTML = "";                      // Limpa a lista antes de preencher
    alunos.forEach(mostrarAluno);              // Mostra cada aluno
}

// Executa quando o formulário é enviado (clique em "Cadastrar")
form.addEventListener("submit", async function(event) {

    // Impede a página de recarregar ao enviar o formulário
    event.preventDefault();

    // Lê o que foi digitado em cada campo
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const email = document.getElementById("email").value;
    const curso = document.getElementById("curso").value;

    // Envia os dados para o servidor no formato JSON
    const resposta = await fetch("/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, idade, email, curso })
    });

    // Converte a resposta do servidor em objeto JavaScript
    const dados = await resposta.json();

    // Mostra a mensagem do servidor em um alerta
    alert(dados.mensagem);

    // Mostra na lista o aluno que o servidor devolveu
    mostrarAluno(dados.aluno);

    // Limpa os campos do formulário
    form.reset();
});

// Ao abrir a página, carrega os alunos que já estão no servidor
carregarAlunos();