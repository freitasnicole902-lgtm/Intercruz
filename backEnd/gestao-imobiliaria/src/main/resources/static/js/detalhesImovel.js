const mensagemCarregamento =
    document.getElementById("mensagem-carregamento");

const conteudoDetalhes =
    document.getElementById("conteudo-detalhes");

const mensagemErro =
    document.getElementById("mensagem-erro");

function preencherCampo(id, valor) {
    const campo = document.getElementById(id);

    campo.textContent =
        valor !== null && valor !== undefined && valor !== ""
            ? valor
            : "Não informado";
}

function formatarMoeda(valor) {
    if (valor === null || valor === undefined || valor === "") {
        return "Não informado";
    }

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarSituacao(situacao) {
    const situacoes = {
        DISPONIVEL: "Disponível",
        "Disponível": "Disponível",
        ALUGADO: "Alugado",
        "Alugado": "Alugado",
        EM_MANUTENCAO: "Em manutenção",
        "Em manutenção": "Em manutenção",
        "EM_MANUTENÇÃO": "Em manutenção"
    };

    return situacoes[situacao] || situacao || "Não informada";
}

function aplicarEstiloSituacao(situacao) {
    const elemento = document.getElementById("status-imovel");

    elemento.className = "status";

    if (["ALUGADO", "Alugado", "alugado"].includes(situacao)) {
        elemento.classList.add("status-alugado");
    } else if (
        ["DISPONIVEL", "Disponível", "disponível"].includes(situacao)
    ) {
        elemento.classList.add("status-disponivel");
    } else {
        elemento.classList.add("status-manutencao");
    }
}

function carregarImovel() {
    const parametros = new URLSearchParams(window.location.search);
    const indiceTexto = parametros.get("index");

    const imoveis =
        JSON.parse(localStorage.getItem("imoveis")) || [];

    if (
        indiceTexto === null ||
        indiceTexto.trim() === "" ||
        !Number.isInteger(Number(indiceTexto)) ||
        Number(indiceTexto) < 0 ||
        Number(indiceTexto) >= imoveis.length
    ) {
        mostrarErro(
            "Imóvel não encontrado. Volte à lista e selecione um imóvel."
        );
        return;
    }

    const imovel = imoveis[Number(indiceTexto)];

    document.getElementById("titulo-imovel").textContent =
        `Imóvel ${imovel.codigo || ""}`;

    document.getElementById("subtitulo-imovel").textContent =
        `Código: ${imovel.codigo || "Não informado"}`;

    const situacao = imovel.situacao || "";
    const status = document.getElementById("status-imovel");

    status.textContent = formatarSituacao(situacao);
    aplicarEstiloSituacao(situacao);

    preencherCampo("campo-codigo", imovel.codigo);
    preencherCampo("campo-tipo", imovel.tipo);

    preencherCampo(
        "campo-area",
        imovel.area !== null &&
        imovel.area !== undefined &&
        imovel.area !== ""
            ? `${imovel.area} m²`
            : null
    );

    preencherCampo("campo-quartos", imovel.quartos);
    preencherCampo("campo-valor", formatarMoeda(imovel.valor));
    preencherCampo("campo-observacoes", imovel.observacoes);
    preencherCampo("campo-endereco", imovel.endereco);
    preencherCampo("campo-bairro", imovel.bairro);
    preencherCampo("campo-cidade", imovel.cidade);

    document.getElementById("btn-editar-imovel").addEventListener(
        "click",
        function () {
            alert("A edição do imóvel ainda não foi implementada.");
        }
    );

    mensagemCarregamento.hidden = true;
    mensagemErro.hidden = true;
    conteudoDetalhes.hidden = false;
}

function mostrarErro(mensagem) {
    mensagemCarregamento.hidden = true;
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

carregarImovel();