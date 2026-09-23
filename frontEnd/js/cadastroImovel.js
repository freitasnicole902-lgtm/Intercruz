const formulario = document.getElementById("form-imovel");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const imovel = {
        id: Date.now(),

        titulo: document.getElementById("titulo").value,
        tipo: document.getElementById("tipo").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        valor: Number(document.getElementById("valor").value),
        quartos: Number(document.getElementById("quartos").value)
    };

    // Recupera os imóveis já cadastrados
    const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

    // Adiciona o novo imóvel
    imoveis.push(imovel);

    // Salva no navegador
    localStorage.setItem("imoveis", JSON.stringify(imoveis));

    alert("Imóvel trado com sucesso!");

    // Verifica de onde o usuário veio
    const parametros = new URLSearchParams(window.location.search);
    const origem = parametros.get("origem");

    if (origem === "imoveis") {
        window.location.href = "imoveis.html";
    } else {
        window.location.href = "index.html";
    }
});