
package br.edu.cesar.fmc.gestao_imobiliaria.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import br.edu.cesar.fmc.gestao_imobiliaria.model.MovFinanceira;
import br.edu.cesar.fmc.gestao_imobiliaria.service.MovFinanceiraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/movimentacoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MovFinanceiraController {

    private final MovFinanceiraService service;

    @GetMapping
    public List<MovFinanceira> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public MovFinanceira buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public MovFinanceira criar(@Valid @RequestBody MovFinanceira movimentacao) {
        return service.criar(movimentacao);
    }

    @PutMapping("/{id}")
    public MovFinanceira atualizar(
            @PathVariable Long id,
            @Valid @RequestBody MovFinanceira movimentacao) {
        return service.atualizar(id, movimentacao);
    }

    @PatchMapping("/{id}/pagamento")
    public MovFinanceira registrarPagamento(
            @PathVariable Long id,
            @RequestBody(required = false) PagamentoRequest request) {

        LocalDate dataPagamento = request != null
                ? request.dataPagamento()
                : null;

        return service.registrarPagamento(id, dataPagamento);
    }

    @PatchMapping("/{id}/pendencia")
    public MovFinanceira registrarPendencia(@PathVariable Long id) {
        return service.registrarPendencia(id);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }

    public record PagamentoRequest(LocalDate dataPagamento) {
    }
}
