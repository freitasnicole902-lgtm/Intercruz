const formulario = document.getElementById("form-imovel");

if (formulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        
        const tituloInput = document.getElementById("titulo") ? document.getElementById("titulo").value : "";
        const tipoInput = document.getElementById("tipo") ? document.getElementById("tipo").value : "";
        const enderecoInput = document.getElementById("endereco") ? document.getElementById("endereco").value : "Sem endereço";
        const cidadeInput = document.getElementById("cidade") ? document.getElementById("cidade").value : "";
        const valorInput = document.getElementById("valor") ? Number(document.getElementById("valor").value) : 0;
        const quartosInput = document.getElementById("quartos") ? Number(document.getElementById("quartos").value) : 0;

        
        let tipoEnum = "CASA";
        const tipoLimpo = tipoInput.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

        if (tipoLimpo.includes("APARTAMENTO")) {
            tipoEnum = "APARTAMENTO";
        } else if (tipoLimpo.includes("CASA")) {
            tipoEnum = "CASA";
        } else if (tipoLimpo.includes("TERRENO")) {
            tipoEnum = "TERRENO";
        } else if (tipoLimpo.includes("GALPAO")) {
            tipoEnum = "GALPAO";
        } else if (tipoLimpo.includes("COMERCIAL")) {
            tipoEnum = "COMERCIAL";
        }

        
        const novoImovel = {
            titulo: tituloInput,
            endereco: enderecoInput,
            cidade: cidadeInput,
            tipo: tipoEnum,
            valor: valorInput,
            quartos: quartosInput,
            situacao: "DISPONIVEL"
        };

        console.log("Enviando JSON ao backend:", novoImovel);

        fetch("http://localhost:8080/api/imoveis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoImovel)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro HTTP: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("Salvo no PostgreSQL:", data);
            alert("Imóvel cadastrado com sucesso!");
            window.location.href = "imoveis.html";
        })
        .catch(error => {
            console.error("Erro na integração:", error);
            alert("Erro ao cadastrar. Verifique se o backend Spring Boot está rodando.");
        });
    });
}