package br.edu.cesar.fmc.gestao_imobiliaria.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_usuario")
@Inheritance(strategy = InheritanceType.JOINED) // Uma forma de herdar em banco de dados
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 

    private String nome;
    private String email;
    private String senha;

    public Usuario() {}

    public Usuario(Integer id, String nome, String email, String senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    public boolean login() {
        System.out.println("Login básico efetuado para o usuário: " + email);
        return true;
    }

    public void logout() {
        System.out.println("Usuário " + email + " desconectou do sistema.");
    }

    public void alterarSenha(String novaSenha) {
        if (novaSenha != null && !novaSenha.isBlank()) {
            this.senha = novaSenha;
            System.out.println("Senha alterada com sucesso.");
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}