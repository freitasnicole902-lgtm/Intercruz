
package br.edu.cesar.fmc.gestao_imobiliaria.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.Categoria;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.StatusPagamento;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.TipoMovimentacao;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "movimentacao_financeira")
public class MovFinanceira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "A descrição é obrigatória.")
    @Column(nullable = false, length = 150)
    private String descricao;

    @NotNull(message = "O tipo da movimentação é obrigatório.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoMovimentacao tipo;

    @NotNull(message = "A categoria é obrigatória.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Categoria categoria;

    // Data de referência ou vencimento.
    @NotNull(message = "A data da movimentação é obrigatória.")
    @Column(nullable = false)
    private LocalDate data;

    @NotNull(message = "O valor é obrigatório.")
    @Positive(message = "O valor deve ser maior que zero.")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valor;

    @NotNull(message = "O status do pagamento é obrigatório.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusPagamento status = StatusPagamento.PENDENTE;

    // Data em que o pagamento realmente aconteceu.
    private LocalDate dataPagamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "imovel_id")
    private Imovel imovel;

    @PrePersist
    @PreUpdate
    private void validarDataPagamento() {
        if (status == StatusPagamento.PENDENTE) {
            dataPagamento = null;
        }
    }
}
