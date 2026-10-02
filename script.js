// Pega o formulário pelo id
const form = document.getElementById("formAluno");

// Pega a lista (<ul>) onde os alunos vão aparecer
const lista = document.getElementById("listaAlunos");

// Executa quando o formulário é enviado (clique em "Cadastrar")
form.addEventListener("submit", async function(event) {

    // Impede a página de recarregar ao enviar o formulário
    event.preventDefault();

    // Lê o que foi digitado nos campos
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;

    // Envia os dados para o servidor no formato JSON
    const resposta = await fetch("/alunos", {
        method: "POST", // Tipo de requisição: enviar dados
        headers: {
            "Content-Type": "application/json" // Avisa que o corpo é JSON
        },
        body: JSON.stringify({
            nome: nome,
            idade: idade
        })
    });

    // Converte a resposta do servidor em objeto JavaScript
    const dados = await resposta.json();

    // Mostra a mensagem do servidor em um alerta
    alert(dados.mensagem);

    // Cria um novo elemento <li>
    const aluno = document.createElement("li");

    // Coloca nome e idade dentro do <li>
    aluno.textContent = `${nome} - ${idade} anos`;

    // Adiciona o aluno na lista da página
    lista.appendChild(aluno);

    // Limpa os campos do formulário
    form.reset();

});