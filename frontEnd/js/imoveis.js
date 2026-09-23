const listaImoveis = document.getElementById("lista-imoveis");

function mostrarImoveis() {
    const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

    listaImoveis.innerHTML = "";

    if (imoveis.length === 0) {
        listaImoveis.innerHTML = `
            <tr>
                <td colspan="6">
                    Nenhum imóvel cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    imoveis.forEach(function (imovel) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${imovel.titulo}</td>
            <td>${imovel.tipo}</td>
            <td>${imovel.endereco}</td>
            <td>${imovel.cidade}</td>
            <td>R$ ${imovel.valor.toLocaleString("pt-BR")}</td>
            <td>${imovel.quartos}</td>
        `;

        listaImoveis.appendChild(linha);
    });
}

mostrarImoveis();