const listaContratos = document.getElementById("lista-contratos");
const modalContrato = document.getElementById("modal-contrato");
const formularioContrato = document.getElementById("form-contrato");

const btnNovoContrato = document.getElementById("btn-novo-contrato");
const btnFecharModalContrato = document.getElementById("btn-fechar-modal-contrato");
const btnCancelarContrato = document.getElementById("btn-cancelar-contrato");

const buscaContrato = document.getElementById("busca-contrato");
const filtroSituacao = document.getElementById("filtro-situacao");

function obterContratos() {
    return JSON.parse(localStorage.getItem("contratos")) || [];
}

function salvarContratos(contratos) {
    localStorage.setItem("contratos", JSON.stringify(contratos));
}

function abrirModal() {
    modalContrato.style.display = "flex";
}

function fecharModal() {
    modalContrato.style.display = "none";
    formularioContrato.reset();
}

btnNovoContrato.addEventListener("click", abrirModal);
btnFecharModalContrato.addEventListener("click", fecharModal);
btnCancelarContrato.addEventListener("click", fecharModal);

modalContrato.addEventListener("click", function (event) {
    if (event.target === modalContrato) {
        fecharModal();
    }
});

formularioContrato.addEventListener("submit", function (event) {
    event.preventDefault();

    const contratos = obterContratos();

    const codigo = document.getElementById("codigo-contrato").value.trim();

    if (contratos.some(contrato => contrato.codigo === codigo)) {
        alert("Já existe um contrato com esse código.");
        return;
    }

    const contrato = {
        codigo: codigo,
        imovel: document.getElementById("codigo-imovel").value.trim(),
        inquilino: document.getElementById("inquilino-contrato").value.trim(),
        valor: Number(document.getElementById("valor-aluguel").value),
        inicio: document.getElementById("data-inicio").value,
        termino: document.getElementById("data-termino").value,
        situacao: document.getElementById("situacao-contrato").value
    };

    contratos.push(contrato);
    salvarContratos(contratos);

    mostrarContratos();
    fecharModal();
});

function formatarData(data) {
    if (!data) return "—";

    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function formatarAluguel(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarContratos() {
    const contratos = obterContratos();

    const busca = buscaContrato.value.trim().toLowerCase();
    const situacaoSelecionada = filtroSituacao.value;

    const filtrados = contratos.filter(function (contrato) {
        const correspondeBusca =
            contrato.codigo.toLowerCase().includes(busca) ||
            contrato.inquilino.toLowerCase().includes(busca);

        const correspondeSituacao =
            !situacaoSelecionada ||
            contrato.situacao === situacaoSelecionada;

        return correspondeBusca && correspondeSituacao;
    });

    listaContratos.innerHTML = "";

    if (filtrados.length === 0) {
        listaContratos.innerHTML = `
            <tr>
                <td colspan="8">Nenhum contrato encontrado.</td>
            </tr>
        `;
        return;
    }

    filtrados.forEach(function (contrato) {
        const linha = document.createElement("tr");

        let classeStatus = "";

        if (contrato.situacao === "Pendente") {
            classeStatus = "status-contrato-pendente";
        } else if (contrato.situacao === "Encerrado") {
            classeStatus = "status-contrato-encerrado";
        }

        const codigoSeguro = contrato.codigo.replace(/'/g, "\\'");

        linha.innerHTML = `
            <td><span class="codigo-contrato">${contrato.codigo}</span></td>
            <td>${contrato.imovel}</td>
            <td>${contrato.inquilino}</td>
            <td>${formatarData(contrato.inicio)}</td>
            <td>${formatarData(contrato.termino)}</td>
            <td>${formatarAluguel(contrato.valor)}</td>
            <td>
                <span class="status-contrato ${classeStatus}">
                    ${contrato.situacao}
                </span>
            </td>
            <td>
                <button type="button"
                        class="btn-ver-contrato"
                        title="Ver contrato"
                        data-codigo="${codigoSeguro}">
                    ◉
                </button>
            </td>
        `;

        linha.querySelector(".btn-ver-contrato").addEventListener("click", function () {
            alert(
                `Contrato: ${contrato.codigo}\n` +
                `Imóvel: ${contrato.imovel}\n` +
                `Inquilino: ${contrato.inquilino}\n` +
                `Início: ${formatarData(contrato.inicio)}\n` +
                `Término: ${formatarData(contrato.termino)}\n` +
                `Aluguel: ${formatarAluguel(contrato.valor)}\n` +
                `Situação: ${contrato.situacao}`
            );
        });

        listaContratos.appendChild(linha);
    });
}

buscaContrato.addEventListener("input", mostrarContratos);
filtroSituacao.addEventListener("change", mostrarContratos);

mostrarContratos();