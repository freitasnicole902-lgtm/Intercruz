package br.edu.cesar.fmc.gestao_imobiliaria.model.enums;

public enum StatusPagamento {
    PENDENTE("Pendente"),
    PAGO("Pago");

    private final String descricao;

    StatusPagamento(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }

}
