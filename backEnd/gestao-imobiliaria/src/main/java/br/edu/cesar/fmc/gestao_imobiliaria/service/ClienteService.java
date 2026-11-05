package br.edu.cesar.fmc.gestao_imobiliaria.service;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Cliente;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service 
public class ClienteService {
    @Autowired 
    private ClienteRepository clienteRepository;

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id) { 
        return clienteRepository.findById(id).orElse(null);
    }

    public Cliente salvar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void deletar(Long id) {
        clienteRepository.deleteById(id);
    }

}
