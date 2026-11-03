// ELEMENTOS DO MODAL DE CLIENTES
const modalCliente = document.getElementById("modal-novo-cliente");
const formularioCliente = document.getElementById("form-cliente");

const btnNovoCliente = document.getElementById("btn-novo-cliente");
const btnFecharModalCliente = document.getElementById("btn-fechar-modal");
const btnCancelarCliente = document.getElementById("btn-cancelar");

// ABRIR MODAL
function abrirModalCliente() {
    modalCliente.style.display = "flex";
}

// FECHAR MODAL
function fecharModalCliente() {
    modalCliente.style.display = "none";
    formularioCliente.reset();
}

// EVENTOS
btnNovoCliente.addEventListener("click", abrirModalCliente);

btnFecharModalCliente.addEventListener("click", fecharModalCliente);

btnCancelarCliente.addEventListener("click", fecharModalCliente);

modalCliente.addEventListener("click", function (event) {
    if (event.target === modalCliente) {
        fecharModalCliente();
    }
});

// MANIPULAÇÃO DE DOCUMENTOS

const inputArquivo = document.getElementById("arquivo-cliente");
const btnAdicionarDocumento = document.getElementById("btn-adicionar-documento");
const listaDocumentos = document.getElementById("lista-documentos");

let documentosSelecionados = [];

btnAdicionarDocumento.addEventListener("click", function () {
    inputArquivo.click();
});

inputArquivo.addEventListener("change", function () {
    const novosArquivos = Array.from(inputArquivo.files);

    novosArquivos.forEach(function (arquivo) {
        documentosSelecionados.push(arquivo);
    });

    mostrarDocumentos();

    inputArquivo.value = "";
});

function mostrarDocumentos() {
    listaDocumentos.innerHTML = "";

    documentosSelecionados.forEach(function (arquivo, index) {
        const item = document.createElement("div");
        item.classList.add("documento-item");

        const nome = document.createElement("span");
        nome.textContent = arquivo.name;

        const remover = document.createElement("button");
        remover.type = "button";
        remover.textContent = "×";

        remover.addEventListener("click", function () {
            documentosSelecionados.splice(index, 1);
            mostrarDocumentos();
        });

        item.appendChild(nome);
        item.appendChild(remover);

        listaDocumentos.appendChild(item);
    });
}