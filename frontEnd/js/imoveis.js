const listaImoveis = document.getElementById("lista-imoveis");

const modal = document.getElementById("modal-imovel");

const btnNovoImovel =
    document.getElementById("btn-novo-imovel");

const btnFecharModal =
    document.getElementById("btn-fechar-modal");

const btnCancelar =
    document.getElementById("btn-cancelar");

const formulario =
    document.getElementById("form-imovel");

let todosImoveis= [];

const campoBusca = document.getElementById("campoBusca");
const filtroTipo = document.getElementById("filtroTipo");
const filtroSituacao = document.getElementById("filtroSituacao");
const filtroBairro = document.getElementById("filtroBairro");


// ==================================================
// ABRIR MODAL
// ==================================================

btnNovoImovel.addEventListener("click", function () {

    modal.style.display = "flex";

});


// ==================================================
// FECHAR MODAL
// ==================================================

function fecharModal() {

    modal.style.display = "none";

    formulario.reset();

}


btnFecharModal.addEventListener(
    "click",
    fecharModal
);

btnCancelar.addEventListener(
    "click",
    fecharModal
);


// ==================================================
// FECHAR CLICANDO FORA
// ==================================================

modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        fecharModal();

    }

});



// ==================================================
// CADASTRAR IMÓVEL
// ==================================================

async function cadastrarImovel(imovel) {
    try {
        const response = await fetch(
            "http://localhost:8080/api/imoveis",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(imovel)
            }
        );

        if (!response.ok) {
            throw new Error("Não foi possível cadastrar o imóvel.");
        }

        await response.json();

        alert("Imóvel cadastrado com sucesso!");

        fecharModal();

        await mostrarImoveis();

    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert(error.message);
    }
}


// ==================================================
// EVENTO DE ENVIO DO FORMULÁRIO
// ==================================================

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const imovel = {
        codigo: document.getElementById("codigo").value.trim(),
        tipo: document.getElementById("tipo").value,
        endereco: document.getElementById("endereco").value.trim(),
        bairro: document.getElementById("bairro").value.trim(),
        cidade: document.getElementById("cidade").value.trim(),
        situacao: document.getElementById("situacao").value,
        valor: Number(document.getElementById("valor").value),
        area: Number(document.getElementById("area").value),
        quartos: Number(document.getElementById("quartos").value),
        observacoes: document.getElementById("observacoes").value.trim()
    };

    await cadastrarImovel(imovel);

});




// ==================================================
// MOSTRAR IMÓVEIS
// ==================================================

function mostrarImoveis() {

    fetch('http://localhost:8080/api/imoveis')

        .then(response => {

            if (!response.ok) {
                throw new Error('Erro ao buscar imóveis do servidor');
            }

            return response.json();

        })

        .then(imoveis => {

            // Armazena todos os imóveis recebidos do backend.
            todosImoveis = imoveis;

            // Atualiza as opções do filtro de bairros.
            popularFiltroBairros(todosImoveis);

            // Aplica os filtros e atualiza a tabela.
            aplicarFiltros();

        })

        .catch(error => {

            console.error('Erro de integração:', error);

            const listaImoveis =
                document.getElementById("lista-imoveis");

            if (listaImoveis) {

                listaImoveis.innerHTML = `
                    <tr>
                        <td colspan="8"
                            style="color: red; text-align: center;">

                            Erro ao conectar com o backend.
                            Certifique-se que o Spring Boot
                            está em execução na porta 8080.

                        </td>
                    </tr>
                `;

            }

        });

}



// ==================================================
// RENDERIZAR IMÓVEIS NA TABELA
// ==================================================

function renderizarImoveis(imoveis) {

    const listaImoveis = document.getElementById("lista-imoveis");

    if (!listaImoveis) return;

    // Limpa a tabela antes de renderizar novamente.
    listaImoveis.innerHTML = "";

    // Verifica se existem imóveis.
    if (imoveis.length === 0) {
        listaImoveis.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center;">
                    Nenhum imóvel encontrado.
                </td>
            </tr>
        `;
        return;
    }

    // Percorre os imóveis recebidos.
    imoveis.forEach(function (imovel) {

        const linha = document.createElement("tr");

        // Redirecionamento para detalhes do imóvel.
        linha.style.cursor = "pointer";

        linha.addEventListener("click", function (event) {

            if (event.target.closest("button")) {
                return;
            }

            window.location.href =
                `detalhesImovel.html?id=${imovel.id}`;

        });

        // Define a classe visual da situação.
        let classeStatus = "";

        const statusNormalizado =
            (imovel.situacao || "").toUpperCase();

        if (
            statusNormalizado === "DISPONIVEL" ||
            statusNormalizado === "DISPONÍVEL"
        ) {
            classeStatus = "status-disponivel";

        } else if (statusNormalizado === "ALUGADO") {

            classeStatus = "status-alugado";

        } else {

            classeStatus = "status-manutencao";

        }

        // Monta as colunas da tabela.
        linha.innerHTML = `
            <td>
                <span class="codigo">
                    ${imovel.codigo || '-'}
                </span>
            </td>

            <td>
                <strong>${imovel.titulo || 'Imóvel'}</strong><br>
                ${imovel.endereco || 'Endereço não informado'}
                <br>
                <small>
                    ${imovel.cidade || ''}
                    ${imovel.quartos ? '• ' + imovel.quartos + ' qto(s)' : ''}
                </small>
            </td>

            <td>
                ${imovel.tipo || '-'}
            </td>

            <td>
                <span class="status ${classeStatus}">
                    ${imovel.situacao || 'Disponível'}
                </span>
            </td>

            <td>-</td>

            <td>
                R$ ${Number(imovel.valor || 0).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </td>

            <td>
                <span class="contrato">Sem contrato</span>
            </td>

            <td>
                <button class="acao" title="Editar">✏️</button>

                <button
                    class="acao"
                    title="Excluir"
                    onclick="excluirImovel(${imovel.id})">
                    🗑️
                </button>
            </td>
        `;

        listaImoveis.appendChild(linha);

    });

}


function normalizar(texto) {
    return (texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function popularFiltroBairros(imoveis) {

    const bairroSelecionado = filtroBairro.value;

    const bairros = [
        ...new Set(
            imoveis
                .map(imovel => imovel.bairro)
                .filter(bairro => bairro && bairro.trim() !== "")
        )
    ];

    bairros.sort((a, b) =>
        a.localeCompare(b, "pt-BR")
    );

    filtroBairro.innerHTML =
        '<option value="">Todos os bairros</option>';

    bairros.forEach(bairro => {

        const option = document.createElement("option");

        option.value = bairro;
        option.textContent = bairro;

        filtroBairro.appendChild(option);

    });

    // Mantém a seleção anterior, se o bairro ainda existir.
    if (bairros.includes(bairroSelecionado)) {
        filtroBairro.value = bairroSelecionado;
    }
}

function aplicarFiltros() {

    const busca = normalizar(campoBusca.value);

    const tipo = filtroTipo.value;
    const situacao = filtroSituacao.value;
    const bairro = filtroBairro.value;

    const filtrados = todosImoveis.filter(imovel => {

        const correspondeBusca = [
            imovel.codigo,
            imovel.endereco,
            imovel.bairro,
            imovel.cidade
        ].some(valor =>
            normalizar(valor).includes(busca)
        );

        return correspondeBusca
            && (!tipo || imovel.tipo === tipo)
            && (!situacao || imovel.situacao === situacao)
            && (!bairro || imovel.bairro === bairro);

    });

    renderizarImoveis(filtrados);
}

campoBusca.addEventListener("input", aplicarFiltros);

filtroTipo.addEventListener("change", aplicarFiltros);

filtroSituacao.addEventListener("change", aplicarFiltros);

filtroBairro.addEventListener("change", aplicarFiltros);


// ==================================================
// EXCLUIR IMÓVEL
// ==================================================

    function excluirImovel(id) {
        if (confirm(`Tem certeza que deseja excluir o imóvel ID ${id}?`)) {
        fetch(`http://localhost:8080/api/imoveis/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                alert("Imóvel excluído com sucesso!");
                mostrarImoveis(); // Recarrega a lista do banco
            } else {
                alert("Erro ao excluir imóvel do banco de dados.");
            }
        })
        .catch(error => console.error("Erro ao excluir:", error));
    }
    mostrarImoveis();
}

// ==================================================
// CARREGAR IMÓVEIS
// ==================================================

mostrarImoveis();