package br.edu.cesar.fmc.gestao_imobiliaria.model.enums;

public enum Categoria {
    ALUGUEL("Aluguel"),
    IPTU("IPTU");

    private final String descricao;

    Categoria(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
