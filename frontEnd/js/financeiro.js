const modalFinanceiro = document.getElementById("modal-nova-movimentacao");
const formularioFinanceiro = document.getElementById("form-financeiro");

const btnNovaMovimentacao = document.getElementById("btn-nova-movimentacao");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnCancelar = document.getElementById("btn-cancelar");

// Abrir modal
function abrirModal() {
    modalFinanceiro.style.display = "flex";
}

// Fechar modal
function fecharModal() {
    modalFinanceiro.style.display = "none";
    formularioFinanceiro.reset();
}

// Eventos
btnNovaMovimentacao.addEventListener("click", abrirModal);
btnFecharModal.addEventListener("click", fecharModal);
btnCancelar.addEventListener("click", fecharModal);

// Fechar ao clicar fora do conteúdo
modalFinanceiro.addEventListener("click", function (event) {
    if (event.target === modalFinanceiro) {
        fecharModal();
    }
});