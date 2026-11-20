
const API_URL = "/api/movimentacoes";

const modalFinanceiro = document.getElementById("modal-nova-movimentacao");
const formularioFinanceiro = document.getElementById("form-contrato");

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


async function carregarMovimentacoes() {
    const listaMovimentacoes = document.getElementById("lista-movimentacoes");

    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar movimentações.");
        }

        const movimentacoes = await resposta.json();

        console.log("Movimentações cadastradas:", movimentacoes);

        
    // Calcular totais financeiros considerando apenas movimentações pagas
    const movimentacoesPagas = movimentacoes.filter(
        movimentacao => movimentacao.status === "PAGO"
    );

    const totalReceitas = movimentacoesPagas
        .filter(m => m.tipo === "ENTRADA")
        .reduce((total, m) => total + Number(m.valor), 0);

    const totalDespesas = movimentacoesPagas
        .filter(m => m.tipo === "SAIDA")
        .reduce((total, m) => total + Number(m.valor), 0);

    const saldo = totalReceitas - totalDespesas;

    // Formatar valores em reais
    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // Atualizar cards
    document.getElementById("total-receitas").textContent =
        formatarMoeda(totalReceitas);

    document.getElementById("total-despesas").textContent =
        formatarMoeda(totalDespesas);

    document.getElementById("saldo-financeiro").textContent =
        formatarMoeda(saldo);


        listaMovimentacoes.innerHTML = "";

        if (movimentacoes.length === 0) {
            listaMovimentacoes.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        Nenhuma movimentação cadastrada.
                    </td>
                </tr>
            `;
            return;
        }

        movimentacoes.forEach(movimentacao => {
            const linha = document.createElement("tr");
        
            const valorFormatado = Number(movimentacao.valor)
                .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });
        
            const botaoPagamento = movimentacao.status === "PENDENTE"
                ? `<button class="btn btn-success btn-sm"
                      onclick="registrarPagamento(${movimentacao.id})">
                      Registrar pagamento
                   </button>`
                : `<span class="text-success">Pagamento realizado</span>`;
        
            linha.innerHTML = `
                <td>${movimentacao.data}</td>
                <td>${movimentacao.descricao}</td>
                <td>${movimentacao.tipo}</td>
                <td>${movimentacao.categoria}</td>
                <td>${valorFormatado}</td>
                <td>${movimentacao.status}</td>
                <td>${botaoPagamento}</td>
            `;
        
            listaMovimentacoes.appendChild(linha);
        });

    } catch (erro) {
        console.error("Erro ao carregar movimentações:", erro);

        listaMovimentacoes.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    Erro ao carregar movimentações.
                </td>
            </tr>
        `;
    }
}

// Registrar pagamento 
async function registrarPagamento(id) {
    const confirmar = confirm(
        "Deseja realmente registrar o pagamento desta movimentação?"
    );

    if (!confirmar) {
        return;
    }

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

    const movimentacao = {
        descricao: document.getElementById("descricao").value.trim(),
        tipo: document.getElementById("tipo-movimentacao").value,
        categoria: document.getElementById("categoria-movimentacao").value,
        data: document.getElementById("data").value,
        valor: Number(document.getElementById("valor").value),
        imovel: null
    };

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

        formularioFinanceiro.reset();
        fecharModal();

        await carregarMovimentacoes();

    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        alert("Não foi possível cadastrar a movimentação: " + erro.message);
    }
}

// Eventos
btnNovaMovimentacao.addEventListener("click", abrirModal);
btnFecharModal.addEventListener("click", fecharModal);
btnCancelar.addEventListener("click", fecharModal);

formularioFinanceiro.addEventListener("submit", cadastrarMovimentacao);

// Fechar ao clicar fora do conteúdo
modalFinanceiro.addEventListener("click", function (event) {
    if (event.target === modalFinanceiro) {
        fecharModal();
    }
});

// Inicialização
carregarMovimentacoes();
