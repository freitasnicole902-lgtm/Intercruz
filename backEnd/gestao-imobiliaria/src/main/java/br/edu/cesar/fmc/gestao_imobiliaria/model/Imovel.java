package br.edu.cesar.fmc.gestao_imobiliaria.model;

import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.SituacaoImovel;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoImovel;
import jakarta.persistence.*;

@Entity
@Table(name = "imovel")
public class Imovel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;      // Usado no cadastroImovel.html ou derivado do Código no Modal[cite: 25, 26]
    private String codigo;      // Código de identificação (ex: IMV-001)
    private String endereco;
    private String bairro;      // Presente no Modal[cite: 26]
    private String cidade;
    private Double valor;
    private Double area;        // Presente no Modal[cite: 26]
    private Integer quartos;
    private String observacoes; // Presente no Modal[cite: 26]

    @Enumerated(EnumType.STRING)
    private TipoImovel tipo;

    @Enumerated(EnumType.STRING)
    private SituacaoImovel situacao;

    // Construtor Padrão
    public Imovel() {}

    // Getters e Setters para todos os campos...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo != null ? titulo : "Imóvel sem título"; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getCodigo() { return codigo != null ? codigo : "N/A"; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public String getEndereco() { return endereco != null ? endereco : "Não informado"; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getBairro() { return bairro != null ? bairro : "Não informado"; }
    public void setBairro(String bairro) { this.bairro = bairro; }

    public String getCidade() { return cidade != null ? cidade : "Não informada"; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public Double getValor() { return valor != null ? valor : 0.0; }
    public void setValor(Double valor) { this.valor = valor; }

    public Double getArea() { return area != null ? area : 0.0; }
    public void setArea(Double area) { this.area = area; }

    public Integer getQuartos() { return quartos != null ? quartos : 0; }
    public void setQuartos(Integer quartos) { this.quartos = quartos; }

    public String getObservacoes() { return observacoes != null ? observacoes : "Nenhuma"; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public TipoImovel getTipo() { return tipo; }
    public void setTipo(TipoImovel tipo) { this.tipo = tipo; }

    public SituacaoImovel getSituacao() { return situacao; }
    public void setSituacao(SituacaoImovel situacao) { this.situacao = situacao; }
}