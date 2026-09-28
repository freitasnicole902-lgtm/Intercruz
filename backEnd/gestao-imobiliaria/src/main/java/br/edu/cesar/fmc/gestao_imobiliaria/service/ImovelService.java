package br.edu.cesar.fmc.gestao_imobiliaria.service;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Imovel;
import br.edu.cesar.fmc.gestao_imobiliaria.model.dto.DashboardDTO;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.SituacaoImovel;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.ImovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImovelService {

    private final ImovelRepository imovelRepository;

    @Autowired
    public ImovelService(ImovelRepository imovelRepository) {
        this.imovelRepository = imovelRepository;
    }

    public List<Imovel> listarTodos() {
        return imovelRepository.findAll();
    }

    public Imovel salvar(Imovel imovel) {
        return imovelRepository.save(imovel);
    }

    public void deletar(Long id) {
        imovelRepository.deleteById(id);
    }

    public DashboardDTO obterEstatisticasDashboard() {
        long total = imovelRepository.count();
        long alugados = imovelRepository.countBySituacao(SituacaoImovel.ALUGADO);
        long disponiveis = imovelRepository.countBySituacao(SituacaoImovel.DISPONIVEL);
        long contratosAtivos = alugados;

        return new DashboardDTO(total, alugados, disponiveis, contratosAtivos);
    }
}