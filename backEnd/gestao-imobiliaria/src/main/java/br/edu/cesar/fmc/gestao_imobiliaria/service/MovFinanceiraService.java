
package br.edu.cesar.fmc.gestao_imobiliaria.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Imovel;
import br.edu.cesar.fmc.gestao_imobiliaria.model.MovFinanceira;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.StatusPagamento;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.ImovelRepository;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.MovFinanceiraRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovFinanceiraService {

    private final MovFinanceiraRepository repository;
    private final ImovelRepository imovelRepository;

    public List<MovFinanceira> listarTodos() {
        return repository.findAll();
    }

    public MovFinanceira buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Movimentação financeira não encontrada."
                ));
    }

    @Transactional
    public MovFinanceira criar(MovFinanceira movimentacao) {
        movimentacao.setStatus(StatusPagamento.PENDENTE);
        movimentacao.setDataPagamento(null);

        vincularImovel(movimentacao);

        return repository.save(movimentacao);
    }

    @Transactional
    public MovFinanceira atualizar(Long id, MovFinanceira dados) {
        MovFinanceira movimentacao = buscarPorId(id);

        movimentacao.setDescricao(dados.getDescricao());
        movimentacao.setTipo(dados.getTipo());
        movimentacao.setCategoria(dados.getCategoria());
        movimentacao.setData(dados.getData());
        movimentacao.setValor(dados.getValor());

        if (dados.getImovel() != null) {
            vincularImovel(dados);
            movimentacao.setImovel(dados.getImovel());
        } else {
            movimentacao.setImovel(null);
        }

        return repository.save(movimentacao);
    }

    @Transactional
    public MovFinanceira registrarPagamento(Long id, LocalDate dataPagamento) {
        MovFinanceira movimentacao = buscarPorId(id);

        movimentacao.setStatus(StatusPagamento.PAGO);
        movimentacao.setDataPagamento(
                dataPagamento != null ? dataPagamento : LocalDate.now()
        );

        return repository.save(movimentacao);
    }

    @Transactional
    public MovFinanceira registrarPendencia(Long id) {
        MovFinanceira movimentacao = buscarPorId(id);

        movimentacao.setStatus(StatusPagamento.PENDENTE);
        movimentacao.setDataPagamento(null);

        return repository.save(movimentacao);
    }

    @Transactional
    public void excluir(Long id) {
        MovFinanceira movimentacao = buscarPorId(id);
        repository.delete(movimentacao);
    }

    private void vincularImovel(MovFinanceira movimentacao) {
        if (movimentacao.getImovel() != null
                && movimentacao.getImovel().getId() != null) {

            Imovel imovel = imovelRepository.findById(
                    movimentacao.getImovel().getId()
            ).orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Imóvel não encontrado."
            ));

            movimentacao.setImovel(imovel);
        } else {
            movimentacao.setImovel(null);
        }
    }
}
