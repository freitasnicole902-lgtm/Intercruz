
const API_URL = "/api/movimentacoes";

let graficoFinanceiro = null;
let movimentacoesAtuais = [];

// Elementos da página
const modalFinanceiro = document.getElementById("modal-nova-movimentacao");

const formularioFinanceiro =
    document.getElementById("form-contrato") ||
    document.getElementById("form-financeiro");

const btnNovaMovimentacao = document.getElementById("btn-nova-movimentacao");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnCancelar = document.getElementById("btn-cancelar");

const listaMovimentacoes = document.getElementById("lista-movimentacoes");
const elementoGrafico = document.getElementById("graficoFinanceiro");

const filtroPeriodo = document.getElementById("filtroPeriodo");
const filtroTipo = document.getElementById("filtroTipo");

// Formatação
function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function normalizarTipo(tipo) {
    const valor = String(tipo || "").toUpperCase();

    if (valor === "ENTRADA" || valor === "ENTRADAS") {
        return "ENTRADA";
    }

    if (valor === "SAIDA" || valor === "SAÍDA" || valor === "SAIDAS") {
        return "SAIDA";
    }

    return valor;
}

function obterDataLocal(data) {
    if (!data) return null;

    const partes = String(data).substring(0, 10).split("-");

    if (partes.length !== 3) return null;

    const ano = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const dia = Number(partes[2]);

    const resultado = new Date(ano, mes, dia);

    return Number.isNaN(resultado.getTime()) ? null : resultado;
}

function formatarData(data) {
    const dataLocal = obterDataLocal(data);

    if (!dataLocal) return "-";

    return dataLocal.toLocaleDateString("pt-BR");
}

// Modal
function abrirModal() {
    if (modalFinanceiro) {
        modalFinanceiro.style.display = "flex";
    }
}

function fecharModal() {
    if (modalFinanceiro) {
        modalFinanceiro.style.display = "none";
    }

    if (formularioFinanceiro) {
        formularioFinanceiro.reset();
    }
}

// Cards financeiros
function atualizarCards(movimentacoes) {
    const pagas = movimentacoes.filter(
        movimentacao => movimentacao.status === "PAGO"
    );

    const receitas = pagas
        .filter(m => normalizarTipo(m.tipo) === "ENTRADA")
        .reduce((total, m) => total + Number(m.valor || 0), 0);

    const despesas = pagas
        .filter(m => normalizarTipo(m.tipo) === "SAIDA")
        .reduce((total, m) => total + Number(m.valor || 0), 0);

    const saldo = receitas - despesas;

    const elementoReceitas = document.getElementById("total-receitas");
    const elementoDespesas = document.getElementById("total-despesas");
    const elementoSaldo = document.getElementById("saldo-financeiro");

    if (elementoReceitas) {
        elementoReceitas.textContent = formatarMoeda(receitas);
    }

    if (elementoDespesas) {
        elementoDespesas.textContent = formatarMoeda(despesas);
    }

    if (elementoSaldo) {
        elementoSaldo.textContent = formatarMoeda(saldo);
    }
}

// Gráfico mensal
function atualizarGrafico(movimentacoes) {
    if (!elementoGrafico) return;

    if (typeof Chart === "undefined") {
        console.warn("Chart.js não foi carregado.");
        return;
    }

    const anoAtual = new Date().getFullYear();

    const receitas = Array(12).fill(0);
    const despesas = Array(12).fill(0);

    movimentacoes
        .filter(m => m.status === "PAGO")
        .forEach(m => {
            const data = obterDataLocal(m.data);

            if (!data || data.getFullYear() !== anoAtual) return;

            const mes = data.getMonth();
            const valor = Number(m.valor || 0);

            if (normalizarTipo(m.tipo) === "ENTRADA") {
                receitas[mes] += valor;
            } else if (normalizarTipo(m.tipo) === "SAIDA") {
                despesas[mes] += valor;
            }
        });

    if (graficoFinanceiro) {
        graficoFinanceiro.destroy();
    }

    graficoFinanceiro = new Chart(elementoGrafico.getContext("2d"), {
        type: "bar",

        data: {
            labels: [
                "Jan", "Fev", "Mar", "Abr",
                "Mai", "Jun", "Jul", "Ago",
                "Set", "Out", "Nov", "Dez"
            ],

            datasets: [
                {
                    label: "Receitas",
                    data: receitas,
                    backgroundColor: "#153F7F",
                    borderRadius: 4,
                    barPercentage: 0.75,
                    categoryPercentage: 0.65
                },
                {
                    label: "Despesas",
                    data: despesas,
                    backgroundColor: "#82B5CE",
                    borderRadius: 4,
                    barPercentage: 0.75,
                    categoryPercentage: 0.65
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {
                legend: {
                    display: true,
                    position: "top"
                },

                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ": " +
                                formatarMoeda(context.parsed.y);
                        }
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true,

                    ticks: {
                        callback: function(valor) {
                            return (valor / 1000) + "K";
                        }
                    },

                    grid: {
                        color: "#eeeeee"
                    }
                },

                x: {
                    grid: {
                        color: "#eeeeee"
                    }
                }
            }
        }
    });
}

// Filtros
function atualizarOpcoesPeriodo(movimentacoes) {
    if (!filtroPeriodo) return;

    const anos = [...new Set(
        movimentacoes
            .map(m => obterDataLocal(m.data))
            .filter(Boolean)
            .map(data => data.getFullYear())
    )].sort((a, b) => b - a);

    const valorAtual = filtroPeriodo.value;

    filtroPeriodo.innerHTML = '<option value="">Todos os períodos</option>';

    anos.forEach(ano => {
        const option = document.createElement("option");
        option.value = String(ano);
        option.textContent = String(ano);
        filtroPeriodo.appendChild(option);
    });

    if (anos.includes(Number(valorAtual))) {
        filtroPeriodo.value = valorAtual;
    }
}

function obterMovimentacoesFiltradas() {
    let resultado = [...movimentacoesAtuais];

    if (filtroPeriodo && filtroPeriodo.value) {
        resultado = resultado.filter(m => {
            const data = obterDataLocal(m.data);
            return data && String(data.getFullYear()) === filtroPeriodo.value;
        });
    }

    if (filtroTipo && filtroTipo.value) {
        const tipoSelecionado = normalizarTipo(filtroTipo.value);

        resultado = resultado.filter(
            m => normalizarTipo(m.tipo) === tipoSelecionado
        );
    }

    return resultado;
}

// Tabela
function renderizarMovimentacoes() {
    if (!listaMovimentacoes) return;

    const movimentacoes = obterMovimentacoesFiltradas();

    listaMovimentacoes.innerHTML = "";

    if (movimentacoes.length === 0) {
        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 8;
        coluna.className = "text-center";
        coluna.textContent = "Nenhuma movimentação encontrada.";

        linha.appendChild(coluna);
        listaMovimentacoes.appendChild(linha);

        return;
    }

    movimentacoes.forEach(m => {
        const linha = document.createElement("tr");

        const imovelNome = m.imovel
            ? (m.imovel.titulo || m.imovel.codigo || "Imóvel vinculado")
            : "—";

        const valores = [
            formatarData(m.data),
            m.descricao || "—",
            imovelNome,
            m.categoria || "—",
            normalizarTipo(m.tipo) === "ENTRADA" ? "Entrada" : "Saída",
            formatarMoeda(m.valor),
            m.status || "—"
        ];

        valores.forEach(valor => {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");

        if (m.status === "PENDENTE") {
            const botao = document.createElement("button");

            botao.type = "button";
            botao.className = "btn btn-success btn-sm";
            botao.textContent = "Registrar pagamento";

            botao.addEventListener("click", () => {
                registrarPagamento(m.id);
            });

            colunaAcoes.appendChild(botao);
        } else {
            const texto = document.createElement("span");
            texto.className = "text-success";
            texto.textContent = "Pagamento realizado";

            colunaAcoes.appendChild(texto);
        }

        linha.appendChild(colunaAcoes);
        listaMovimentacoes.appendChild(linha);
    });
}

// Carregar movimentações
async function carregarMovimentacoes() {
    if (!listaMovimentacoes) return;

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar movimentações.");
        }

        const movimentacoes = await resposta.json();

        movimentacoesAtuais = Array.isArray(movimentacoes)
            ? movimentacoes
            : [];

        atualizarCards(movimentacoesAtuais);
        atualizarGrafico(movimentacoesAtuais);
        atualizarOpcoesPeriodo(movimentacoesAtuais);
        renderizarMovimentacoes();

        console.log("Movimentações cadastradas:", movimentacoesAtuais);

    } catch (erro) {
        console.error("Erro ao carregar movimentações:", erro);

        listaMovimentacoes.innerHTML = "";

        const linha = document.createElement("tr");
        const coluna = document.createElement("td");

        coluna.colSpan = 8;
        coluna.className = "text-center text-danger";
        coluna.textContent = "Erro ao carregar movimentações.";

        linha.appendChild(coluna);
        listaMovimentacoes.appendChild(linha);
    }
}

// Registrar pagamento
async function registrarPagamento(id) {
    const confirmar = confirm(
        "Deseja realmente registrar o pagamento desta movimentação?"
    );

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}/pagamento`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dataPagamento: new Date().toISOString().split("T")[0]
            })
        });

        if (!resposta.ok) {
            const mensagem = await resposta.text();
            throw new Error(mensagem || "Erro ao registrar pagamento.");
        }

        alert("Pagamento registrado com sucesso!");

        await carregarMovimentacoes();

    } catch (erro) {
        console.error("Erro ao registrar pagamento:", erro);
        alert("Não foi possível registrar o pagamento: " + erro.message);
    }
}

// Cadastrar movimentação
async function cadastrarMovimentacao(event) {
    event.preventDefault();

    const tipoSelecionado =
        document.getElementById("tipo-movimentacao").value;

    const codigoImovel =
        document.getElementById("codigo-imovel")?.value || "";

    const movimentacao = {
        descricao: document.getElementById("descricao").value.trim(),
        tipo: normalizarTipo(tipoSelecionado),
        categoria: document.getElementById("categoria-movimentacao").value,
        data: document.getElementById("data").value,
        valor: Number(document.getElementById("valor").value),
        
    };imovel: null

    if (!movimentacao.descricao || !movimentacao.data ||
        !Number.isFinite(movimentacao.valor) || movimentacao.valor <= 0) {
        alert("Preencha os campos corretamente.");
        return;
    }

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movimentacao)
        });

        if (!resposta.ok) {
            const mensagem = await resposta.text();
            throw new Error(mensagem || "Erro ao cadastrar movimentação.");
        }

        alert("Movimentação cadastrada com sucesso!");

        fecharModal();
        await carregarMovimentacoes();

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        alert("Não foi possível cadastrar a movimentação: " + erro.message);
    }
}

// Eventos
if (btnNovaMovimentacao) {
    btnNovaMovimentacao.addEventListener("click", abrirModal);
}

if (btnFecharModal) {
    btnFecharModal.addEventListener("click", fecharModal);
}

if (btnCancelar) {
    btnCancelar.addEventListener("click", fecharModal);
}

if (formularioFinanceiro) {
    formularioFinanceiro.addEventListener("submit", cadastrarMovimentacao);
}

if (modalFinanceiro) {
    modalFinanceiro.addEventListener("click", event => {
        if (event.target === modalFinanceiro) {
            fecharModal();
        }
    });
}

if (filtroPeriodo) {
    filtroPeriodo.addEventListener("change", renderizarMovimentacoes);
}

if (filtroTipo) {
    filtroTipo.addEventListener("change", renderizarMovimentacoes);
}

// Inicialização
carregarMovimentacoes();
