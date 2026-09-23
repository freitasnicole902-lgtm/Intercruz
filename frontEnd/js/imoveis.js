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

        const imoveis =
            JSON.parse(
                localStorage.getItem("imoveis")
            ) || [];


        // Adiciona o novo imóvel

        imoveis.push(imovel);


        // Salva

        localStorage.setItem(
            "imoveis",
            JSON.stringify(imoveis)
        );


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

    const imoveis =
        JSON.parse(
            localStorage.getItem("imoveis")
        ) || [];


    listaImoveis.innerHTML = "";


    if (imoveis.length === 0) {

        listaImoveis.innerHTML = `

            <tr>

                <td colspan="8">

                    Nenhum imóvel cadastrado.

                </td>

            </tr>

        `;

        return;

    }


    imoveis.forEach(function (imovel, index) {

        const linha =
            document.createElement("tr");


        // Define a classe do status

        let classeStatus = "";

        if (imovel.situacao === "Disponível") {

            classeStatus = "status-disponivel";

        } else if (imovel.situacao === "Alugado") {

            classeStatus = "status-alugado";

        } else {

            classeStatus = "status-manutencao";

        }


        linha.innerHTML = `

            <td>

                <span class="codigo">

                    ${imovel.codigo}

                </span>

            </td>


            <td>

                ${imovel.endereco}

                <br>

                <small>

                    ${imovel.bairro} -
                    ${imovel.cidade}

                </small>

            </td>


            <td>

                ${imovel.tipo}

            </td>


            <td>

                <span class="status ${classeStatus}">

                    ${imovel.situacao}

                </span>

            </td>


            <td>

                -

            </td>


            <td>

                R$ ${Number(imovel.valor).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}

            </td>


            <td>

                <span class="contrato">

                    Sem contrato

                </span>

            </td>


            <td>

                <button
                    class="acao"
                    title="Editar">

                    🗑️

                </button>


                <button
                    class="acao"
                    title="Excluir"
                    onclick="excluirImovel(${index})">

                    ✏️

                </button>

            </td>

        `;


        listaImoveis.appendChild(linha);

    });

}


// ==================================================
// EXCLUIR IMÓVEL
// ==================================================

function excluirImovel(index) {

    const imoveis =
        JSON.parse(
            localStorage.getItem("imoveis")
        ) || [];


    imoveis.splice(index, 1);


    localStorage.setItem(
        "imoveis",
        JSON.stringify(imoveis)
    );


    mostrarImoveis();

}


// ==================================================
// CARREGAR IMÓVEIS
// ==================================================

mostrarImoveis();