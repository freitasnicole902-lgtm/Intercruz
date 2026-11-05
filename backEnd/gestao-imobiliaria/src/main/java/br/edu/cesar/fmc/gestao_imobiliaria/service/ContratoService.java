package br.edu.cesar.fmc.gestao_imobiliaria.service;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Contrato;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service 
public class ContratoService {
    @Autowired 
    private ContratoRepository contratoRepository;
    public List<Contrato> listarTodos() {
        return contratoRepository.findAll();
    }

    public Contrato buscarPorId(Long id) { 
        return contratoRepository.findById(id).orElse(null);
    }

    public Contrato salvar(Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    public void deletar(Long id) {
        contratoRepository.deleteById(id);
    }

}
