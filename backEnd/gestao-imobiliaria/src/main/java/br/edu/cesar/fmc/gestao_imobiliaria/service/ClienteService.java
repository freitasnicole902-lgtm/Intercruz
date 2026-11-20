package br.edu.cesar.fmc.gestao_imobiliaria.service;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Cliente;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
@Service 
public class ClienteService {
    @Autowired 
    private ClienteRepository clienteRepository;

    @Transactional(readOnly = true)
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    } 

    @Transactional(readOnly = true)
    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id).orElse(null);
    }

    @Transactional
    public Cliente salvar(Cliente cliente) {

        if (cliente.getRgCpf() == null ||
            cliente.getRgCpf().trim().isEmpty()) {

            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "O CPF/CNPJ é obrigatório."
            );
        }

        String documento = cliente.getRgCpf().trim();

        cliente.setRgCpf(documento);

        boolean documentoDuplicado;

        if (cliente.getId() == 0) {
            documentoDuplicado =
                clienteRepository.existsByRgCpf(documento);
        } else {
            documentoDuplicado =
                clienteRepository.existsByRgCpfAndIdNot(
                    documento,
                    cliente.getId()
                );
        }

        if (documentoDuplicado) {
            throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Já existe um cliente cadastrado com esse documento."
            );
        }

        return clienteRepository.save(cliente);
    }

    @Transactional 
    public void deletar(Long id) {
        clienteRepository.deleteById(id);
    }


}
