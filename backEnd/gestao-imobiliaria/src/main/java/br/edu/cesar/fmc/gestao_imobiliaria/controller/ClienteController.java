
package br.edu.cesar.fmc.gestao_imobiliaria.controller;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Cliente;
import br.edu.cesar.fmc.gestao_imobiliaria.service.ClienteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    // 1. LISTAR TODOS
    @GetMapping
    public ResponseEntity<List<Cliente>> listarTodos() {
        List<Cliente> clientes = clienteService.listarTodos();
        return ResponseEntity.ok(clientes);
    }

    // 2. BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {

        Cliente cliente = clienteService.buscarPorId(id);

        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cliente);
    }

    // 3. CADASTRAR CLIENTE
    @PostMapping
    public ResponseEntity<Cliente> criar(@RequestBody Cliente cliente) {

        Cliente novoCliente = clienteService.salvar(cliente);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(novoCliente);
    }

    // 4. ATUALIZAR CLIENTE
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(
            @PathVariable Long id,
            @RequestBody Cliente clienteAtualizado) {

        Cliente clienteExistente = clienteService.buscarPorId(id);

        if (clienteExistente == null) {
            return ResponseEntity.notFound().build();
        }

        clienteAtualizado.setId(id);

        Cliente clienteSalvo = clienteService.salvar(clienteAtualizado);

        return ResponseEntity.ok(clienteSalvo);
    }

    // 5. EXCLUIR CLIENTE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        Cliente clienteExistente = clienteService.buscarPorId(id);

        if (clienteExistente == null) {
            return ResponseEntity.notFound().build();
        }

        clienteService.deletar(id);

        return ResponseEntity.noContent().build();
    }
}
