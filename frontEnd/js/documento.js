document.addEventListener("DOMContentLoaded", function () {

    const modalDocumento = document.getElementById("modal-documento");

    const btnNovoDocumento = document.getElementById("btn-novo-documento");
    const btnFecharDocumento = document.getElementById("btn-fechar-documento");
    const btnCancelarDocumento = document.getElementById("btn-cancelar-documento");

    console.log("Modal:", modalDocumento);
    console.log("Botão:", btnNovoDocumento);

    if (!modalDocumento || !btnNovoDocumento ||
        !btnFecharDocumento || !btnCancelarDocumento) {
        console.error("Não foi possível encontrar todos os elementos do modal.");
        return;
    }

    btnNovoDocumento.addEventListener("click", function () {
        modalDocumento.classList.add("aberto");
    });

    function fecharModal() {
        modalDocumento.classList.remove("aberto");
    }

    btnFecharDocumento.addEventListener("click", fecharModal);
    btnCancelarDocumento.addEventListener("click", fecharModal);

    modalDocumento.addEventListener("click", function (event) {
        if (event.target === modalDocumento) {
            fecharModal();
        }
    });

});