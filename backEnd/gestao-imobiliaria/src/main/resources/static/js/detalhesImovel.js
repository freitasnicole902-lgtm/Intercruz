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

async function carregarImovel() {
    const parametros = new URLSearchParams(window.location.search);
    const idTexto = parametros.get("id");

    if (!idTexto || !/^\d+$/.test(idTexto)) {
        mostrarErro(
            "Identificador do imóvel inválido ou não informado."
        );
        return;
    }

    try {
        const response = await fetch(
            `/api/imoveis/${encodeURIComponent(idTexto)}`
        );

        if (response.status === 404) {
            mostrarErro("Imóvel não encontrado.");
            return;
        }

        if (!response.ok) {
            throw new Error("Erro ao buscar imóvel no servidor.");
        }

        const imovel = await response.json();

    

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
} catch (error) {
    console.error(error);
    mostrarErro(
        "Não foi possível carregar os dados do imóvel"
    );
}
}

function mostrarErro(mensagem) {
    mensagemCarregamento.hidden = true;
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

carregarImovel(); 