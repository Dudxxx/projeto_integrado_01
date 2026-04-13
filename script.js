document.addEventListener("DOMContentLoaded", () => {
  const ANO_LANCAMENTO = 2026;
  const IDADE_MINIMA = 16;

  const botaoTema = document.querySelector("[data-botao-tema]");
  const botaoIdade = document.querySelector("[data-botao-idade]");

  const aplicarTema = (modoClaro) => {
    document.body.classList.toggle("tema-claro", modoClaro);
    if (botaoTema) {
      botaoTema.textContent = modoClaro ? "Tema Escuro" : "Tema Claro";
    }
    localStorage.setItem("tema-eclipse", modoClaro ? "claro" : "escuro");
  };

  const aplicarBlurConteudo = (liberado) => {
    document.querySelectorAll("[data-sensivel]").forEach((el) => {
      el.style.filter = liberado ? "blur(0px)" : "blur(12px)";
    });
  };

  const verificarIdade = () => {
    const resposta = prompt("Digite sua idade para acessar o conteúdo sensível do jogo:");
    const idade = Number(resposta);

    if (Number.isNaN(idade)) {
      alert("Acesso negado: idade inválida.");
      aplicarBlurConteudo(false);
      sessionStorage.setItem("idade-eclipse", "negado");
      return;
    }

    if (idade >= IDADE_MINIMA) {
      alert("Acesso liberado: conteúdo sensível desbloqueado.");
      aplicarBlurConteudo(true);
      sessionStorage.setItem("idade-eclipse", "liberado");
    } else {
      alert("Acesso negado: conteúdo sensível continuará borrado.");
      aplicarBlurConteudo(false);
      sessionStorage.setItem("idade-eclipse", "negado");
    }
  };

  const temaSalvo = localStorage.getItem("tema-eclipse");
  aplicarTema(temaSalvo === "claro");

  const statusIdade = sessionStorage.getItem("idade-eclipse");
  if (statusIdade === "liberado") {
    aplicarBlurConteudo(true);
  } else if (statusIdade === "negado") {
    aplicarBlurConteudo(false);
  }

  if (botaoTema) {
    botaoTema.addEventListener("click", () => {
      const modoClaroAtivo = !document.body.classList.contains("tema-claro");
      aplicarTema(modoClaroAtivo);
    });
  }

  if (botaoIdade) {
    botaoIdade.addEventListener("click", verificarIdade);
  }

  if (!sessionStorage.getItem("idade-eclipse")) {
    setTimeout(verificarIdade, 500);
  }

  if (
    !sessionStorage.getItem("alerta-lancamento") &&
    new Date().getFullYear() === ANO_LANCAMENTO
  ) {
    alert("Grande Lançamento: Eclipse Carmesim!");
    sessionStorage.setItem("alerta-lancamento", "sim");
  }

  const formularioNome = document.querySelector("[data-form-nome]");
  const inputNome = document.querySelector("[data-input-nome]");
  const mensagemNome = document.querySelector("[data-mensagem-nome]");

  if (formularioNome && inputNome && mensagemNome) {
    formularioNome.addEventListener("submit", (event) => {
      event.preventDefault();
      const nome = inputNome.value.trim();

      if (nome) {
        mensagemNome.textContent = `Bem-vindo, ${nome}. Prepare-se para enfrentar a noite.`;
      } else {
        mensagemNome.textContent = "Digite seu nome para receber uma mensagem.";
      }
    });
  }
});