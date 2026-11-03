const formulario = document.getElementById("form-imovel");

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipoSelect = document.getElementById("tipo").value.toUpperCase(); // ex: "CASA"
    const situacaoSelect = document.getElementById("situacao") 
      ? document.getElementById("situacao").value.toUpperCase() 
      : "DISPONIVEL";

    const novoImovel = {
      titulo: document.getElementById("titulo") ? document.getElementById("titulo").value : "Imóvel Sem Título",
      codigo: document.getElementById("codigo") ? document.getElementById("codigo").value : "IMV-000",
      endereco: document.getElementById("endereco").value,
      cidade: document.getElementById("cidade").value,
      tipo: tipoSelect,
      valor: Number(document.getElementById("valor").value),
      quartos: Number(document.getElementById("quartos").value),
      situacao: situacaoSelect
    };

    fetch("http://localhost:8080/api/imoveis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoImovel)
    })
    .then(response => {
      if (!response.ok) throw new Error("Erro HTTP: " + response.status);
      return response.json();
    })
    .then(data => {
      alert("Imóvel cadastrado com sucesso!");
      window.location.href = "imoveis.html";
    })
    .catch(error => {
      console.error("Erro no cadastro:", error);
      alert("Falha ao salvar imóvel. Verifique o backend.");
    });
  });
}
