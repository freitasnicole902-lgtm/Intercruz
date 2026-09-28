package br.edu.cesar.fmc.gestao_imobiliaria.model;

import jakarta.persistence.Entity;

@Entity
public class Gestor extends Usuario {

    private String departamento; // Ex: "Financeiro"
    private String nivelAcesso;  // Ex: "Gestor"

    // Construtor padrão
    public Gestor() {
        super();
    }

    // Construtor completo, só que utilizando super
    public Gestor(Integer id, String nome, String email, String senha, String departamento, String nivelAcesso) {
        super(id, nome, email, senha);
        this.departamento = departamento;
        this.nivelAcesso = nivelAcesso;
    }

    @Override
    public boolean login() {
        System.out.println("Autenticando GESTOR [" + nivelAcesso + "] no departamento " + departamento);
        System.out.println("Acesso administrativo concedido para: " + getEmail());
        return true;
    }

    public void aprovarPrestacaoDeContas() {
        System.out.println("Gestor " + getNome() + " aprovou o relatório de prestação de contas da Fundação.");
    }


    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getNivelAcesso() {
        return nivelAcesso;
    }

    public void setNivelAcesso(String nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }
}