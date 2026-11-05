package br.edu.cesar.fmc.gestao_imobiliaria.controller;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Cliente;
import br.edu.cesar.fmc.gestao_imobiliaria.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController 
@RequestMapping("api/cliente") 
@CrossOrigin("origins = *") 
public class ClienteController {
    @Autowired 
    private ClienteService clienteService;

    @GetMapping 
    public ResponseEntity<List<Cliente>> listarTodos() {
        List<Cliente> clientes = clienteService.listarTodos();
        return ResponseEntity.ok(clientes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        Cliente cliente = clienteService.buscarPorId(id);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping 
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente) {
        Cliente novoCliente = clienteService.salvar(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
        Cliente clienteExistente = clienteService.buscarPorId(id);
        if (clienteExistente != null) {
            clienteAtualizado.setId(id);
            Cliente clienteSalvo = clienteService.salvar(clienteAtualizado);
            return ResponseEntity.ok(clienteSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }  

    @DeleteMapping("/{id}") 
    public ResponseEntity<Cliente> deletar(@PathVariable Long id) {
        Cliente clienteExistente = clienteService.buscarPorId(id);
        if (clienteExistente != null) {
            clienteService.deletar(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
}
