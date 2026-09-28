package br.edu.cesar.fmc.gestao_imobiliaria.model;

import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.SituacaoImovel;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoImovel;
import jakarta.persistence.*;

@Entity
@Table(name = "tb_imovel")
public class Imovel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String codigo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoImovel tipo;

    @Column(nullable = false, length = 200)
    private String endereco;

    @Column(nullable = false, length = 100)
    private String bairro;

    @Column(nullable = false, length = 100)
    private String cidade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SituacaoImovel situacao;

    @Column(nullable = false)
    private Double valor;

    private Double area;
    private Integer quartos;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    public Imovel() {}

    public Imovel(String codigo, TipoImovel tipo, String endereco, String bairro, String cidade,
                  SituacaoImovel situacao, Double valor, Double area, Integer quartos, String observacoes) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.endereco = endereco;
        this.bairro = bairro;
        this.cidade = cidade;
        this.situacao = situacao;
        setValor(valor);
        this.area = area;
        this.quartos = quartos;
        this.observacoes = observacoes;
    }

    public void setValor(Double valor) {
        if (valor != null && valor < 0) {
            throw new IllegalArgumentException("O valor do aluguel não pode ser negativo.");
        }
        this.valor = valor;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }
    public TipoImovel getTipo() { return tipo; }
    public void setTipo(TipoImovel tipo) { this.tipo = tipo; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public String getBairro() { return bairro; }
    public void setBairro(String bairro) { this.bairro = bairro; }
    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }
    public SituacaoImovel getSituacao() { return situacao; }
    public void setSituacao(SituacaoImovel situacao) { this.situacao = situacao; }
    public Double getValor() { return valor; }
    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }
    public Integer getQuartos() { return quartos; }
    public void setQuartos(Integer quartos) { this.quartos = quartos; }
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}