package br.edu.cesar.fmc.gestao_imobiliaria.model.enums;

public enum TipoPessoa {
    PESSOA_FISICA("Pessoa Física"),
    PESSOA_JURIDICA("Pessoa Jurídica");

    private final String descricao;

    TipoPessoa(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
