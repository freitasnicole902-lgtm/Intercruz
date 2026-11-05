package br.edu.cesar.fmc.gestao_imobiliaria.model;

import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoPessoa;
import jakarta.persistence.*;
import java.util.Objects;

@Entity 
public class Cliente {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, length = 150)
    private String nome;

    @Column(nullable = false, unique = true, length = 14)
    private String rgCpf; 

    private String telefone;
    private String email;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

    private double renda;

    @Enumerated(EnumType.STRING)

    private TipoPessoa tipoPessoa;

    public Cliente() { }

    //Construtor completo
    public Cliente(String nome, String rgCpf, String telefone, String email, String observacoes, double renda, TipoPessoa tipoPessoa) {
        this.nome = nome;
        this.rgCpf = rgCpf;
        this.telefone = telefone;
        this.email = email;
        this.observacoes = observacoes;
        this.renda = renda;
        this.tipoPessoa = tipoPessoa;
    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getRgCpf() { return rgCpf; }
    public void setRgCpf(String rgCpf) { this.rgCpf = rgCpf; }

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
    
    // ADICIONADO: equals e hashCode baseados no ID
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cliente clientes = (Cliente) o;
        return id == clientes.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    // ADICIONADO: toString para logs limpos
    @Override
    public String toString() {
        return "Clientes{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", rgCpf='" + rgCpf + '\'' +
                ", tipoPessoa=" + tipoPessoa +
                '}';
    }
}
