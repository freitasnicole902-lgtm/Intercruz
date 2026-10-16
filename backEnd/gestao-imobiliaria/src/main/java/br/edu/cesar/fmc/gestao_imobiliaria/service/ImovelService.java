package br.edu.cesar.fmc.gestao_imobiliaria.service;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Imovel;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.ImovelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImovelService {

    private final ImovelRepository imovelRepository;

    public ImovelService(ImovelRepository imovelRepository) {
        this.imovelRepository = imovelRepository;
    }

    public Imovel salvar(Imovel imovel) {
        // Exemplo de regra de negócio (validação de valor)
        if (imovel.getValor() != null && imovel.getValor() < 0) {
            throw new IllegalArgumentException("O valor do imóvel não pode ser negativo.");
        }
        return imovelRepository.save(imovel);
    }

    public List<Imovel> listarTodos() {
        return imovelRepository.findAll();
    }

    public Optional<Imovel> buscarPorId(Long id) {
        return imovelRepository.findById(id);
    }

    public void deletar(Long id) {
        imovelRepository.deleteById(id);
    }
}