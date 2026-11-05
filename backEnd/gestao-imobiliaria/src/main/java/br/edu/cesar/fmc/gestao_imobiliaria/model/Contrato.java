package br.edu.cesar.fmc.gestao_imobiliaria.model;
import jakarta.persistence.*;
import java.time.LocalDate;

import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoContrato;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoPessoa;

@Entity 
public class Contrato {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String codigo;
    private LocalDate data_Inicio;
    private LocalDate data_Termino;
    private double valorContrato;
    private int mes; 

    @ManyToOne 
    @JoinColumn(name = "imovel_id")
    private Imovel imovel;

    @ManyToOne 
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;



    @Enumerated(EnumType.STRING)
    private TipoContrato tipoContrato;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getCodigo() {
        return codigo;
    }
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public LocalDate getData_Inicio() {
        return data_Inicio;
    }
    public void setData_Inicio(LocalDate data_Inicio) {
        this.data_Inicio = data_Inicio;
    }
    public LocalDate getData_Termino() {
        return data_Termino;
    }
    public void setData_Termino(LocalDate data_Termino) {
        this.data_Termino = data_Termino;
    }
    public double getValorContrato() {
        return valorContrato;
    }
    public void setValorContrato(double valorContrato) {
        this.valorContrato = valorContrato;
    }
    public int getMes() {
        return mes;
    }
    public void setMes(int mes) {
        this.mes = mes;
    }
    public TipoContrato getTipoContrato() {
        return tipoContrato;
    }
    public void setTipoContrato(TipoContrato tipoContrato) {
        this.tipoContrato = tipoContrato;
    }

}
