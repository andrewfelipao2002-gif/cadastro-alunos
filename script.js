// Pega o formulário pelo id
const form = document.getElementById("formAluno");

// Pega a lista (<ul>) onde os alunos vão aparecer
const lista = document.getElementById("listaAlunos");

// Executa quando o formulário é enviado (clique em "Cadastrar")
form.addEventListener("submit", async function(event) {

    // Impede a página de recarregar ao enviar o formulário
    event.preventDefault();

    
    // Lê o que foi digitado em cada campo do formulário
const nome = document.getElementById("nome").value;
const idade = document.getElementById("idade").value;
const email = document.getElementById("email").value;
const curso = document.getElementById("curso").value;

    // Envia os dados para o servidor no formato JSON
    const resposta = await fetch("/alunos", {
        method: "POST", // Tipo de requisição: enviar dados
        headers: {
            "Content-Type": "application/json" // Avisa que o corpo é JSON
        },
        // Converte os 4 campos para JSON e envia ao servidor
         body: JSON.stringify({
         nome: nome,
         idade: idade,
          email: email,
         curso: curso
})
    });

    // Converte a resposta do servidor em objeto JavaScript
    const dados = await resposta.json();

    // Mostra a mensagem do servidor em um alerta
    alert(dados.mensagem);

    // Cria um novo elemento <li>
    const aluno = document.createElement("li");

    // Coloca nome e idade dentro do <li>
    aluno.textContent = `${nome} - ${idade} anos - ${email} - ${curso}`;

    // Adiciona o aluno na lista da página
    lista.appendChild(aluno);

    // Limpa os campos do formulário
    form.reset();

});