package br.edu.cesar.fmc.gestao_imobiliaria.model;

import jakarta.persistence.*;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.SituacaoImovel;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoImovel;

@Entity
@Table(name = "tb_imovel")
public class Imovel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String endereco;
    private String cidade;

    @Enumerated(EnumType.STRING)
    private TipoImovel tipo;

    private Double valor;

    private Integer quartos;

    @Enumerated(EnumType.STRING)
    private SituacaoImovel situacao;
    public Imovel() {}

    public Imovel(Long id, String titulo, String endereco, String cidade, TipoImovel tipo, Double valor, Integer quartos, SituacaoImovel situacao) {
        this.id = id;
        this.titulo = titulo;
        this.endereco = endereco;
        this.cidade = cidade;
        this.tipo = tipo;
        this.valor = valor;
        this.quartos = quartos;
        this.situacao = situacao;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public TipoImovel getTipo() {
        return tipo;
    }

    public void setTipo(TipoImovel tipo) {
        this.tipo = tipo;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Integer getQuartos() {
        return quartos;
    }

    public void setQuartos(Integer quartos) {
        this.quartos = quartos;
    }

    public SituacaoImovel getSituacao() {
        return situacao;
    }

    public void setSituacao(SituacaoImovel situacao) {
        this.situacao = situacao;
    }
}