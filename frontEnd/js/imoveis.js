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

formulario.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const imovel = {

            codigo:
                document.getElementById("codigo").value,

            tipo:
                document.getElementById("tipo").value,

            endereco:
                document.getElementById("endereco").value,

            bairro:
                document.getElementById("bairro").value,

            cidade:
                document.getElementById("cidade").value,

            situacao:
                document.getElementById("situacao").value,

            valor:
                Number(
                    document.getElementById("valor").value
                ),

            area:
                Number(
                    document.getElementById("area").value
                ),

            quartos:
                Number(
                    document.getElementById("quartos").value
                ),

            observacoes:
                document.getElementById("observacoes").value

        };


        // Pega os imóveis existentes

       // Substitua a parte do localStorage por isso:
    fetch("http://localhost:8080/api/imoveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            endereco: document.getElementById("endereco") ? document.getElementById("endereco").value : "",
            tipo: (document.getElementById("tipo") ? document.getElementById("tipo").value : "CASA").toUpperCase(),
            valor: Number(document.getElementById("valor") ? document.getElementById("valor").value : 0),
            situacao: "DISPONIVEL"
        })
    })
    .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar");
        return response.json();
    })
    .then(() => {
        alert("Imóvel cadastrado com sucesso!");
        mostrarImoveis(); // Recarrega a tabela com os dados do banco
    })
    .catch(err => console.error("Erro no cadastro:", err));


        // Atualiza tabela

        mostrarImoveis();


        // Fecha modal

        fecharModal();

    }
);


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
            const listaImoveis = document.getElementById("lista-imoveis");
            if (!listaImoveis) return;

            listaImoveis.innerHTML = "";

            if (imoveis.length === 0) {
                listaImoveis.innerHTML = `
                    <tr>
                        <td colspan="8" style="text-align: center;">
                            Nenhum imóvel cadastrado no banco de dados.
                        </td>
                    </tr>
                `;
                return;
            }

            imoveis.forEach(function (imovel) {
                const linha = document.createElement("tr");

                let classeStatus = "";
                const statusNormalizado = (imovel.situacao || "").toUpperCase();
                if (statusNormalizado === "DISPONIVEL" || statusNormalizado === "DISPONÍVEL") {
                    classeStatus = "status-disponivel";
                } else if (statusNormalizado === "ALUGADO") {
                    classeStatus = "status-alugado";
                } else {
                    classeStatus = "status-manutencao";
                }

                linha.innerHTML = `
                    <td>
                        <span class="codigo">IMV-${imovel.id || '-'}</span>
                    </td>
                    <td>
                        <strong>${imovel.titulo || 'Imóvel'}</strong><br>
                        ${imovel.endereco || 'Endereço não informado'}
                        <br>
                        <small>${imovel.cidade || ''} ${imovel.quartos ? '• ' + imovel.quartos + ' qto(s)' : ''}</small>
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
                        <button class="acao" title="Excluir" onclick="excluirImovel(${imovel.id})">🗑️</button>
                    </td>
                `;
                listaImoveis.appendChild(linha);
            });
        })
        .catch(error => {
            console.error('Erro de integração:', error);
            const listaImoveis = document.getElementById("lista-imoveis");
            if (listaImoveis) {
                listaImoveis.innerHTML = `
                    <tr>
                        <td colspan="8" style="color: red; text-align: center;">
                            Erro ao conectar com o backend. Certifique-se que o Spring Boot está em execução na porta 8080.
                        </td>
                    </tr>
                `;
            }
        });
}


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