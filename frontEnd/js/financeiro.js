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


// =====================================
// GRÁFICO FINANCEIRO
// =====================================

const elementoGrafico = document.getElementById("graficoFinanceiro");

if (elementoGrafico) {

    const contexto = elementoGrafico.getContext("2d");

    new Chart(contexto, {

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
                    label: "Despesas",

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
                    position: "top"
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
