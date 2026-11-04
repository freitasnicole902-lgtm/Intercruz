package br.edu.cesar.fmc.gestao_imobiliaria.model.enums;

public enum TipoContrato {
    APARTAMENTO("Apartamento"),
    CASA("Casa"),
    COMERCIAL("Comercial"),
    OUTRO("Outro");


    private final String descricao;

    TipoContrato(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
