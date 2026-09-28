package br.edu.cesar.fmc.gestao_imobiliaria.model.enums;

public enum TipoImovel {
    APARTAMENTO("Apartamento"),
    CASA("Casa"),
    TERRENO("Terreno"),
    GALPAO("Galpão"),
    COMERCIAL("Comercial");

    private final String descricao;

    TipoImovel(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() { return descricao; }
}