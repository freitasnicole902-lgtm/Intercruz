package br.edu.cesar.fmc.gestao_imobiliaria.model;

import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoPessoa;
import jakarta.persistence.*;

@Entity 
public class Clientes {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nome;
    private String cpfCnpj;
    private String telefone;
    private String email;
    private String observacoes;
    private double renda;
    @Enumerated(EnumType.STRING)
    private TipoPessoa tipoPessoa;

    

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCpfCnpj() { return cpfCnpj; }
    public void setCpfCnpj(String cpfCnpj) { this.cpfCnpj = cpfCnpj; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public double getRenda() { return renda; }
    public void setRenda(double renda) { this.renda = renda; }

    public TipoPessoa getTipoPessoa() { return tipoPessoa; }
    public void setTipoPessoa(TipoPessoa tipoPessoa) { this.tipoPessoa = tipoPessoa; }
    
}
