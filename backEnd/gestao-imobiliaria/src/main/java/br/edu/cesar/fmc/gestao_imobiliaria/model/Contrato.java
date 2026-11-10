
package br.edu.cesar.fmc.gestao_imobiliaria.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoContrato;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "contrato")
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O código do contrato é obrigatório.")
    @Column(nullable = false, unique = true, length = 30)
    private String codigo;

    @NotNull(message = "A data de início é obrigatória.")
    @Column(nullable = false)
    private LocalDate dataInicio;

    @NotNull(message = "A data de término é obrigatória.")
    @Column(nullable = false)
    private LocalDate dataTermino;

    @NotNull(message = "O valor do contrato é obrigatório.")
    @Positive(message = "O valor do contrato deve ser maior que zero.")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valorContrato;

    @NotNull(message = "O mês é obrigatório.")
    @Column(nullable = false)
    private Integer mes;

    @NotNull(message = "O imóvel é obrigatório.")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "imovel_id", nullable = false)
    private Imovel imovel;

    @NotNull(message = "O cliente é obrigatório.")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @NotNull(message = "O tipo de contrato é obrigatório.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoContrato tipoContrato;

    @JsonIgnore
    @AssertTrue(message = "A data de término deve ser posterior à data de início.")
    public boolean isPeriodoValido() {
        if (dataInicio == null || dataTermino == null) {
            return true;
        }

        return dataTermino.isAfter(dataInicio);
    }
}
