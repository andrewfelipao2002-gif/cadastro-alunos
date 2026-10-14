// Pega o formulário pelo id
const form = document.getElementById("formAluno");

// Pega a lista (<ul>) onde os alunos vão aparecer
const lista = document.getElementById("listaAlunos");

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

// Pede ao servidor todos os alunos cadastrados e mostra na tela
async function carregarAlunos() {
    const resposta = await fetch("/alunos");   // Requisição GET
    const alunos = await resposta.json();      // Converte o JSON em array

    lista.innerHTML = "";                      // Limpa a lista antes de preencher
    alunos.forEach(mostrarAluno);              // Mostra cada aluno
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

    // Mostra na lista o aluno que o servidor devolveu
    mostrarAluno(dados.aluno);

    // Limpa os campos do formulário
    form.reset();
});

// Ao abrir a página, carrega os alunos que já estão no servidor
carregarAlunos();