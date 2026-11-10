
const API_URL = "http://localhost:8080/api";

const listaContratos = document.getElementById("lista-contratos");
const modalContrato = document.getElementById("modal-contrato");
const formularioContrato = document.getElementById("form-contrato");

const btnNovoContrato = document.getElementById("btn-novo-contrato");
const btnFecharModalContrato = document.getElementById("btn-fechar-modal-contrato");
const btnCancelarContrato = document.getElementById("btn-cancelar-contrato");

const buscaContrato = document.getElementById("busca-contrato");
const filtroSituacao = document.getElementById("filtro-situacao");

const campoCliente = document.getElementById("inquilino-contrato");
const campoImovel = document.getElementById("codigo-imovel");

let contratos = [];
let clientes = [];
let imoveis = [];

// Buscar dados do backend
async function carregarDados() {
    try {
        const [resContratos, resClientes, resImoveis] =
            await Promise.all([
                fetch(`${API_URL}/contratos`),
                fetch(`${API_URL}/clientes`),
                fetch(`${API_URL}/imoveis`)
            ]);

        if (!resContratos.ok || !resClientes.ok || !resImoveis.ok) {
            throw new Error("Não foi possível carregar os dados.");
        }

        contratos = await resContratos.json();
        clientes = await resClientes.json();
        imoveis = await resImoveis.json();

        preencherClientes();
        preencherImoveis();
        mostrarContratos();

    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        alert("Erro ao conectar com o backend. Verifique se o Spring Boot está rodando.");
    }
}

// Preencher seleção de clientes
function preencherClientes() {
    campoCliente.innerHTML = '<option value="">Selecione o cliente</option>';

    clientes.forEach(cliente => {
        const opcao = document.createElement("option");
        opcao.value = cliente.id;
        opcao.textContent = cliente.nome;
        campoCliente.appendChild(opcao);
    });
}

// Preencher seleção de imóveis
function preencherImoveis() {
    campoImovel.innerHTML = '<option value="">Selecione o imóvel</option>';

    imoveis.forEach(imovel => {
        const opcao = document.createElement("option");
        opcao.value = imovel.id;
        opcao.textContent = `${imovel.codigo} - ${imovel.titulo || imovel.tipo}`;
        campoImovel.appendChild(opcao);
    });
}

// Modal
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

modalContrato.addEventListener("click", event => {
    if (event.target === modalContrato) {
        fecharModal();
    }
});

// Converter tipo para o enum do Java
function converterTipo(tipo) {
    const tipos = {
        "Apartamento": "APARTAMENTO",
        "Casa": "CASA",
        "Comercial": "COMERCIAL",
        "Outro": "OUTRO"
    };

    return tipos[tipo] || tipo.toUpperCase();
}

// Cadastrar contrato no PostgreSQL
formularioContrato.addEventListener("submit", async function (event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo-contrato").value.trim();

    if (contratos.some(c => c.codigo.toLowerCase() === codigo.toLowerCase())) {
        alert("Já existe um contrato com esse código.");
        return;
    }

    const dataInicio = document.getElementById("data-inicio").value;
    const dataTermino = document.getElementById("data-termino").value;

    if (dataTermino <= dataInicio) {
        alert("A data de término deve ser posterior à data de início.");
        return;
    }

    const contrato = {
        codigo: codigo,
        dataInicio: dataInicio,
        dataTermino: dataTermino,
        valorContrato: Number(document.getElementById("valor-aluguel").value),
        mes: Number(document.getElementById("vencimento-contrato").value),
        imovel: {
            id: Number(campoImovel.value)
        },
        cliente: {
            id: Number(campoCliente.value)
        },
        tipoContrato: converterTipo(
            document.getElementById("tipo-contrato").value
        )
    };

    try {
        const resposta = await fetch(`${API_URL}/contratos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contrato)
        });

        if (!resposta.ok) {
            const erro = await resposta.text();
            throw new Error(erro || `Erro HTTP: ${resposta.status}`);
        }

        alert("Contrato cadastrado com sucesso!");

        fecharModal();
        await carregarDados();

    } catch (erro) {
        console.error("Erro ao cadastrar contrato:", erro);
        alert("Não foi possível cadastrar o contrato. Verifique os dados e o backend.");
    }
});

// Formatação
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

// Situação calculada pelas datas, pois o backend não possui campo situacao
function obterSituacao(contrato) {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const termino = new Date(contrato.dataTermino + "T00:00:00");
    const inicio = new Date(contrato.dataInicio + "T00:00:00");

    if (hoje > termino) return "Encerrado";
    if (hoje < inicio) return "Pendente";

    return "Ativo";
}

// Exibir contratos
function mostrarContratos() {
    const busca = buscaContrato.value.trim().toLowerCase();
    const situacaoSelecionada = filtroSituacao.value;

    const filtrados = contratos.filter(contrato => {
        const nomeCliente = contrato.cliente?.nome || "";

        const correspondeBusca =
            contrato.codigo.toLowerCase().includes(busca) ||
            nomeCliente.toLowerCase().includes(busca);

        const correspondeSituacao =
            !situacaoSelecionada ||
            obterSituacao(contrato) === situacaoSelecionada;

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

    filtrados.forEach(contrato => {
        const linha = document.createElement("tr");

        const situacao = obterSituacao(contrato);

        let classeStatus = "";

        if (situacao === "Pendente") {
            classeStatus = "status-contrato-pendente";
        } else if (situacao === "Encerrado") {
            classeStatus = "status-contrato-encerrado";
        }

        const imovel = contrato.imovel || {};
        const cliente = contrato.cliente || {};

        const dados = [
            contrato.codigo,
            imovel.codigo || `ID ${imovel.id}`,
            cliente.nome || `ID ${cliente.id}`,
            formatarData(contrato.dataInicio),
            formatarData(contrato.dataTermino),
            formatarAluguel(contrato.valorContrato)
        ];

        dados.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaStatus = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className = `status-contrato ${classeStatus}`;
        etiqueta.textContent = situacao;

        celulaStatus.appendChild(etiqueta);
        linha.appendChild(celulaStatus);

        const celulaAcao = document.createElement("td");
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "btn-ver-contrato";
        botao.title = "Ver contrato";
        botao.textContent = "◉";

        botao.addEventListener("click", () => {
            alert(
                `Contrato: ${contrato.codigo}\n` +
                `Imóvel: ${imovel.codigo || imovel.id}\n` +
                `Cliente: ${cliente.nome || cliente.id}\n` +
                `Início: ${formatarData(contrato.dataInicio)}\n` +
                `Término: ${formatarData(contrato.dataTermino)}\n` +
                `Valor: ${formatarAluguel(contrato.valorContrato)}\n` +
                `Situação: ${situacao}`
            );
        });

        celulaAcao.appendChild(botao);
        linha.appendChild(celulaAcao);

        listaContratos.appendChild(linha);
    });
}

// Filtros
buscaContrato.addEventListener("input", mostrarContratos);
filtroSituacao.addEventListener("change", mostrarContratos);

// Inicialização
carregarDados();
