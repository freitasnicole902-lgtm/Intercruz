
// =====================================
// MODAL FINANCEIRO
// =====================================

const modalFinanceiro = document.getElementById("modal-nova-movimentacao");
const formularioFinanceiro = document.getElementById("form-financeiro");

const btnNovaMovimentacao = document.getElementById("btn-nova-movimentacao");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnCancelar = document.getElementById("btn-cancelar");

// Abrir modal
function abrirModal() {
    if (modalFinanceiro) {
        modalFinanceiro.style.display = "flex";
    }
}

// Fechar modal
function fecharModal() {
    if (modalFinanceiro) {
        modalFinanceiro.style.display = "none";
    }

    if (formularioFinanceiro) {
        formularioFinanceiro.reset();
    }
}

// Eventos do modal
if (btnNovaMovimentacao) {
    btnNovaMovimentacao.addEventListener("click", abrirModal);
}

if (btnFecharModal) {
    btnFecharModal.addEventListener("click", fecharModal);
}

if (btnCancelar) {
    btnCancelar.addEventListener("click", fecharModal);
}

if (modalFinanceiro) {
    modalFinanceiro.addEventListener("click", function(event) {
        if (event.target === modalFinanceiro) {
            fecharModal();
        }
    });
}


// =====================================
// GRÁFICOS DO DASHBOARD
// =====================================

// Verificar se o Chart.js foi carregado
if (typeof Chart !== "undefined") {

    // =====================================
    // 1. GRÁFICO FINANCEIRO
    // =====================================

    const elementoGrafico = document.getElementById("graficoFinanceiro");

    if (elementoGrafico) {

        new Chart(elementoGrafico.getContext("2d"), {

            type: "bar",

            data: {
                labels: [
                    "Jan", "Fev", "Mar", "Abr",
                    "Mai", "Jun", "Jul", "Ago",
                    "Set", "Out", "Nov", "Dez"
                ],

                datasets: [
                    {
                        label: "Alugados",
                        data: [
                            30000, 30000, 30000, 30000,
                            30000, 30000, 30000, 30000,
                            30000, 30000, 30000, 30000
                        ],
                        backgroundColor: "#153F7F",
                        borderRadius: 4,
                        barPercentage: 0.75,
                        categoryPercentage: 0.65
                    },

                    {
                        label: "Disponíveis",
                        data: [
                            12000, 12000, 12000, 12000,
                            12000, 12000, 12000, 12000,
                            12000, 12000, 12000, 12000
                        ],
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
                        position: "bottom"
                    },

                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ": " +
                                    context.parsed.y.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    });
                            }
                        }
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,

                        ticks: {
                            callback: function(value) {
                                return (value / 1000) + "K";
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


    // =====================================
    // 2. GRÁFICO DE DISTRIBUIÇÃO DOS IMÓVEIS
    // =====================================

    const ctxImoveis = document.getElementById("graficoImoveis");

    if (ctxImoveis) {

        new Chart(ctxImoveis, {

            type: "doughnut",

            data: {
                labels: [
                    "Alugados",
                    "Disponíveis",
                    "Em manutenção"
                ],

                datasets: [{
                    data: [91, 27, 6],

                    backgroundColor: [
                        "#123e7a",
                        "#83b5d0",
                        "#dddddd"
                    ],

                    borderWidth: 0
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }


    // =====================================
    // 3. GRÁFICO DE EVOLUÇÃO DAS RECEITAS
    // =====================================

    const ctxReceitas = document.getElementById("graficoReceitas");

    if (ctxReceitas) {

        new Chart(ctxReceitas, {

            type: "line",

            data: {
                labels: [
                    "Jan", "Fev", "Mar", "Abr",
                    "Mai", "Jun", "Jul", "Ago"
                ],

                datasets: [{
                    label: "Receitas",

                    data: [
                        20000, 23000, 27000, 31000,
                        35000, 39000, 43000, 47000
                    ],

                    borderColor: "#123e7a",
                    backgroundColor: "#123e7a",
                    borderWidth: 2,
                    pointRadius: 3,
                    tension: 0
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

} else {
    console.error("Chart.js não foi carregado!");
}
