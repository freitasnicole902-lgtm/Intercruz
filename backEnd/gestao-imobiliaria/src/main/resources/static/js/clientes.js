
// ==========================================
// CONFIGURAÃ‡ÃƒO DA API
// ==========================================

const API_CLIENTES = "/api/clientes";

let clientesCache = [];
let clienteEmEdicaoId = null;


// ==========================================
// ELEMENTOS DO MODAL DE CLIENTES
// ==========================================

const modalCliente = document.getElementById("modal-novo-cliente");
const formularioCliente = document.getElementById("form-cliente");

const btnNovoCliente = document.getElementById("btn-novo-cliente");
const btnFecharModalCliente = document.getElementById("btn-fechar-modal");
const btnCancelarCliente = document.getElementById("btn-cancelar");

const listaClientes = document.getElementById("lista-clientes");
const campoBuscaCliente = document.getElementById("busca-contrato");
const tituloModalCliente = document.querySelector("#modal-novo-cliente .modal-contrato-cabecalho h2");


// ==========================================
// ABRIR E FECHAR MODAL
// ==========================================

function abrirModalCliente() {
    clienteEmEdicaoId = null;

    formularioCliente.reset();

    tituloModalCliente.textContent = "Novo cliente";

    modalCliente.style.display = "flex";
}

function fecharModalCliente() {
    modalCliente.style.display = "none";

    formularioCliente.reset();

    clienteEmEdicaoId = null;

    tituloModalCliente.textContent = "Novo cliente";

    documentosSelecionados = [];

    mostrarDocumentos();
}


// ==========================================
// EVENTOS DO MODAL
// ==========================================

btnNovoCliente.addEventListener("click", abrirModalCliente);

btnFecharModalCliente.addEventListener("click", fecharModalCliente);

btnCancelarCliente.addEventListener("click", fecharModalCliente);

modalCliente.addEventListener("click", function (event) {
    if (event.target === modalCliente) {
        fecharModalCliente();
    }
});


// ==========================================
// MANIPULAÃ‡ÃƒO DE DOCUMENTOS
// ==========================================

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
        remover.textContent = "Ã—";

        remover.addEventListener("click", function () {
            documentosSelecionados.splice(index, 1);
            mostrarDocumentos();
        });

        item.appendChild(nome);
        item.appendChild(remover);

        listaDocumentos.appendChild(item);
    });
}


// ==========================================
// COMUNICAÃ‡ÃƒO COM A API
// ==========================================

// LISTAR CLIENTES

async function listarClientes() {
    const response = await fetch(API_CLIENTES);

    if (!response.ok) {
        throw new Error("Erro ao consultar clientes.");
    }

    return await response.json();
}


// CADASTRAR CLIENTE

async function cadastrarCliente(cliente) {
    const response = await fetch(API_CLIENTES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });

    if (!response.ok) {
        throw new Error(await obterErroAPI(response));
    }

    return await response.json();
}


// ATUALIZAR CLIENTE

async function atualizarCliente(id, cliente) {
    const response = await fetch(`${API_CLIENTES}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });

    if (!response.ok) {
        throw new Error(await obterErroAPI(response));
    }

    return await response.json();
}


// EXCLUIR CLIENTE

async function excluirCliente(id) {
    const response = await fetch(`${API_CLIENTES}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(await obterErroAPI(response));
    }
}


// TRATAR ERROS DA API

async function obterErroAPI(response) {
    try {
        const erro = await response.json();

        return erro.detail || erro.message ||
            "Erro na operaÃ§Ã£o. CÃ³digo HTTP: " + response.status;

    } catch {
        return "Erro na operaÃ§Ã£o. CÃ³digo HTTP: " + response.status;
    }
}


// ==========================================
// RENDERIZAR TABELA DE CLIENTES
// ==========================================

async function renderizarClientes() {
    try {
        listaClientes.innerHTML = `
            <tr>
                <td colspan="6">Carregando clientes...</td>
            </tr>
        `;

        clientesCache = await listarClientes();

        aplicarBuscaClientes();

    } catch (error) {
        console.error(error);

        listaClientes.innerHTML = `
            <tr>
                <td colspan="6">Erro ao carregar clientes.</td>
            </tr>
        `;
    }
}


// ==========================================
// PREENCHER TABELA
// ==========================================

function preencherTabelaClientes(clientes) {
    listaClientes.innerHTML = "";

    if (clientes.length === 0) {
        listaClientes.innerHTML = `
            <tr>
                <td colspan="6">Nenhum cliente encontrado.</td>
            </tr>
        `;
        return;
    }

    clientes.forEach(function (cliente) {
        const linha = document.createElement("tr");

        const nome = document.createElement("td");
        nome.textContent = cliente.nome || "";

        const documento = document.createElement("td");
        documento.textContent = cliente.rgCpf || "";

        const telefone = document.createElement("td");
        telefone.textContent = cliente.telefone || "";

        const email = document.createElement("td");
        email.textContent = cliente.email || "";

        const tipoPessoa = document.createElement("td");
        tipoPessoa.textContent =
            cliente.tipoPessoa === "PESSOA_FISICA"
                ? "Pessoa FÃ­sica"
                : "Pessoa JurÃ­dica";

        const acoes = document.createElement("td");

        // BOTÃƒO EDITAR

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", function () {
            editarCliente(cliente);
        });

        // BOTÃƒO EXCLUIR

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function () {
            deletarCliente(cliente.id);
        });

        acoes.appendChild(btnEditar);
        acoes.appendChild(btnExcluir);

        linha.appendChild(nome);
        linha.appendChild(documento);
        linha.appendChild(telefone);
        linha.appendChild(email);
        linha.appendChild(tipoPessoa);
        linha.appendChild(acoes);

        listaClientes.appendChild(linha);
    });
}


// ==========================================
// PESQUISAR CLIENTES
// ==========================================

function aplicarBuscaClientes() {
    const termo = campoBuscaCliente.value
        .trim()
        .toLowerCase();

    const clientesFiltrados = clientesCache.filter(function (cliente) {
        return (
            (cliente.nome || "").toLowerCase().includes(termo) ||
            (cliente.rgCpf || "").toLowerCase().includes(termo)
        );
    });

    preencherTabelaClientes(clientesFiltrados);
}

campoBuscaCliente.addEventListener("input", aplicarBuscaClientes);


// ==========================================
// EDITAR CLIENTE
// ==========================================

function editarCliente(cliente) {
    clienteEmEdicaoId = cliente.id;

    document.getElementById("nome").value = cliente.nome || "";

    document.getElementById("documento").value =
        cliente.rgCpf || "";

    document.getElementById("telefone").value =
        cliente.telefone || "";

    document.getElementById("email").value =
        cliente.email || "";

    document.getElementById("observacoes-cliente").value =
        cliente.observacoes || "";

    document.getElementById("renda").value =
        cliente.renda ?? 0;

    document.getElementById("tipo-cliente").value =
        cliente.tipoPessoa || "PESSOA_FISICA";

    tituloModalCliente.textContent = "Editar cliente";

    modalCliente.style.display = "flex";
}


// ==========================================
// EXCLUIR CLIENTE
// ==========================================

async function deletarCliente(id) {
    const confirmar = confirm(
        "Tem certeza de que deseja excluir este cliente?"
    );

    if (!confirmar) {
        return;
    }

    try {
        await excluirCliente(id);

        alert("Cliente excluÃ­do com sucesso!");

        await renderizarClientes();

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}


// ==========================================
// CADASTRAR E ATUALIZAR PELO FORMULÃRIO
// ==========================================

formularioCliente.addEventListener("submit", async function (event) {
    event.preventDefault();

    const cliente = {
        nome: document.getElementById("nome").value.trim(),

        rgCpf: document.getElementById("documento").value.trim(),

        telefone: document.getElementById("telefone").value.trim(),

        email: document.getElementById("email").value.trim(),

        observacoes: document.getElementById("observacoes-cliente").value,

        renda: Number(document.getElementById("renda").value),

        tipoPessoa: document.getElementById("tipo-cliente").value
    };

    try {
        if (clienteEmEdicaoId !== null) {

            await atualizarCliente(clienteEmEdicaoId, cliente);

            alert("Cliente atualizado com sucesso!");

        } else {

            await cadastrarCliente(cliente);

            alert("Cliente cadastrado com sucesso!");
        }

        fecharModalCliente();

        await renderizarClientes();

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});


// ==========================================
// INICIALIZAÃ‡ÃƒO
// ==========================================

renderizarClientes();
