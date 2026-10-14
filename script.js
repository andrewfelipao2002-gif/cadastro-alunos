// Pega o formulário pelo id
const form = document.getElementById("formAluno");

// Pega a lista (<ul>) onde os alunos vão aparecer
const lista = document.getElementById("listaAlunos");

// Pega o campo de busca pelo id
const busca = document.getElementById("busca");

// Guarda todos os alunos recebidos do servidor (a busca filtra esta cópia)
let todosAlunos = [];

// Cria um <li> com os dados do aluno e um botão "Excluir"
function mostrarAluno(aluno) {
    const item = document.createElement("li");

    // Texto com os dados do aluno
    const texto = document.createElement("span");
    texto.textContent = `${aluno.nome} - ${aluno.idade} anos - ${aluno.email} - ${aluno.curso}`;

    // Botão que exclui este aluno
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "btn-excluir";
    botaoExcluir.addEventListener("click", function() {
        excluirAluno(aluno.id);   // Passa o id do aluno para a função
    });

    // Coloca o texto e o botão dentro do <li>, e o <li> na lista
    item.appendChild(texto);
    item.appendChild(botaoExcluir);
    lista.appendChild(item);
}

// Mostra na tela só os alunos cujo nome contém o texto da busca
function mostrarLista() {
    // Texto digitado, em minúsculas e sem espaços nas pontas
    const textoBusca = busca.value.toLowerCase().trim();

    // Mantém só os alunos cujo nome contém o texto
    const filtrados = todosAlunos.filter(function(aluno) {
        return aluno.nome.toLowerCase().includes(textoBusca);
    });

    lista.innerHTML = "";            // Limpa a lista antes de preencher
    filtrados.forEach(mostrarAluno); // Mostra cada aluno filtrado
}

// Pede ao servidor todos os alunos cadastrados e mostra na tela
async function carregarAlunos() {
    const resposta = await fetch("/alunos");   // Requisição GET
    todosAlunos = await resposta.json();       // Guarda o array recebido
    mostrarLista();                            // Mostra respeitando a busca
}

// Pede ao servidor para excluir o aluno e atualiza a lista
async function excluirAluno(id) {
    // Pergunta antes de apagar, para evitar clique por engano
    if (!confirm("Deseja realmente excluir este aluno?")) {
        return;
    }

    // Requisição DELETE para /alunos/<id>
    const resposta = await fetch("/alunos/" + id, { method: "DELETE" });
    const dados = await resposta.json();

    alert(dados.mensagem);

    // Recarrega a lista, agora sem o aluno excluído
    carregarAlunos();
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

    // Recarrega a lista do servidor, já com o aluno novo
    carregarAlunos();

    // Limpa os campos do formulário
    form.reset();
});

// A cada letra digitada na busca, atualiza a lista
busca.addEventListener("input", mostrarLista);

// Ao abrir a página, carrega os alunos que já estão no servidor
carregarAlunos();
