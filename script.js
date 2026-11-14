// Aula 11: funções e dados do perfil no console.
const nome = document.querySelector("h1").textContent;
const area = "Front-End";
const semestre = 2;
const matriculado = true;
const concluidos = 2;
const andamento = 1;

function apresentarPerfil(nome, area) {
  return `Meu nome é ${nome} e estou estudando ${area}.`;
}

function resumirProjetos(concluidos, andamento) {
  return concluidos + andamento;
}

function mostrarSituacao(total) {
  if (total > 0) {
    console.log("Há projetos cadastrados.");
  } else {
    console.log("Nenhum projeto cadastrado.");
  }

  if (total === 0) {
    console.log("Ainda sem projetos");
  } else if (total <= 2) {
    console.log("Portfólio em construção");
  } else {
    console.log("Portfólio com vários projetos");
  }
}

console.log("Portfólio conectado!");
console.log("nome:", typeof nome, "| semestre:", typeof semestre, "| matriculado:", typeof matriculado);
console.log(apresentarPerfil(nome, area));
console.log(apresentarPerfil("Lia", "lógica"));
const total = resumirProjetos(concluidos, andamento);
console.log("Projetos do perfil:", total);
console.log("Teste com 1 concluído e 1 em andamento:", resumirProjetos(1, 1));
mostrarSituacao(total);
mostrarSituacao(2);
mostrarSituacao(0);
// As duas condições precisam ser verdadeiras para mostrar a etapa de estudos.
if (matriculado && semestre === 2) {
  console.log("Cursando o segundo semestre.");
}

// DOM e eventos: apresentação, tema e lista de projetos.
const tema = document.querySelector("#tema");
tema.addEventListener("click", function () {
  const escuro = document.body.classList.toggle("escuro");
  tema.setAttribute("aria-pressed", escuro);
  tema.textContent = escuro ? "Tema claro" : "Tema escuro";
});

const mais = document.querySelector("#mais");
const detalhes = document.querySelector("#mais-sobre");
mais.addEventListener("click", function () {
  detalhes.hidden = !detalhes.hidden;
  mais.setAttribute("aria-expanded", !detalhes.hidden);
  mais.textContent = detalhes.hidden ? "Mostrar mais" : "Mostrar menos";
});

const lista = document.querySelector("#lista-projetos");
const filtro = document.querySelector("#filtro");
const statusProjeto = document.querySelector("#status");
const cadastro = document.querySelector("#cadastro");

function filtrarProjetos() {
  let visiveis = 0;
  for (const card of lista.querySelectorAll(".card")) {
    card.hidden = filtro.value !== "todos" && card.dataset.categoria !== filtro.value;
    if (!card.hidden) visiveis++;
  }
  document.querySelector("#contador").textContent = visiveis === 1 ? "1 projeto visível" : `${visiveis} projetos visíveis`;
}

filtro.addEventListener("change", filtrarProjetos);
cadastro.addEventListener("submit", function (evento) {
  evento.preventDefault();
  if (!cadastro.checkValidity()) {
    cadastro.reportValidity();
    return;
  }
  const dados = new FormData(cadastro);
  const titulo = dados.get("nome").trim();
  if (titulo.length < 3) {
    statusProjeto.textContent = "Digite pelo menos três caracteres no nome do projeto.";
    cadastro.elements.nome.focus();
    return;
  }
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.categoria = dados.get("categoria");
  const cabecalho = document.createElement("h3");
  cabecalho.textContent = titulo;
  const categoria = document.createElement("p");
  categoria.textContent = card.dataset.categoria === "web" ? "Categoria: Web" : "Categoria: Lógica";
  const remover = document.createElement("button");
  remover.type = "button";
  remover.className = "remover";
  remover.textContent = "Remover";
  card.append(cabecalho, categoria, remover);
  lista.append(card);
  filtrarProjetos();
  statusProjeto.textContent = card.hidden ? "Projeto cadastrado. Selecione Todas para vê-lo." : "Projeto cadastrado.";
  cadastro.reset();
  cadastro.elements.nome.focus();
});

lista.addEventListener("click", function (evento) {
  const botao = evento.target.closest(".remover");
  if (!botao || !lista.contains(botao)) return;
  const card = botao.closest(".card");
  const titulo = card.querySelector("h3").textContent;
  card.remove();
  filtrarProjetos();
  statusProjeto.textContent = `Projeto removido: ${titulo}.`;
  filtro.focus();
});
filtrarProjetos();

const contato = document.querySelector("#form-contato");
contato.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const dados = new FormData(contato);
  const assunto = encodeURIComponent(dados.get("assunto"));
  const texto = ["Nome: " + dados.get("nome"), "E-mail: " + dados.get("email"), "", dados.get("mensagem")].join("\r\n");
  window.location.href = contato.action + "?subject=" + assunto + "&body=" + encodeURIComponent(texto);
  document.querySelector("#retorno-contato").textContent = "Confirme o envio no aplicativo de e-mail. Se ele não abrir, use o endereço acima.";
});