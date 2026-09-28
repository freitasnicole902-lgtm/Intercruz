package br.edu.cesar.fmc.gestao_imobiliaria.model.enums;

public enum SituacaoImovel {
    DISPONIVEL("Disponível"),
    ALUGADO("Alugado"),
    EM_MANUTENCAO("Em Manutenção");

    private final String descricao;

    SituacaoImovel(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}