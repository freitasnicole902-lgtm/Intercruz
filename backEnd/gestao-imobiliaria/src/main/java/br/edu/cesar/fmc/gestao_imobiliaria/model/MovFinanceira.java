package br.edu.cesar.fmc.gestao_imobiliaria.model;

import java.time.LocalDate;

import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.Categoria;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoMovimentacao;
import lombok.Getter;
import lombok.Setter;


@Getter 
@Setter 
public class MovFinanceira {
    private String descricao;
    private TipoMovimentacao tipo;
    private Categoria categoria;
    private LocalDate data;
    private double valor;

    
}
