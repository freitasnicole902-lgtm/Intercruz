package br.edu.cesar.fmc.gestao_imobiliaria.controller;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Contrato;
import br.edu.cesar.fmc.gestao_imobiliaria.service.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/contratos")
@CrossOrigin(origins = "*") 
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    // 1. LISTAR TODOS (GET) -> http://localhost:8080/api/contratos
    @GetMapping
    public ResponseEntity<List<Contrato>> listarTodos() {
        List<Contrato> contratos = contratoService.listarTodos(); 
        return ResponseEntity.ok(contratos);
    }

    // 2. BUSCAR POR ID (GET) -> http://localhost:8080/api/contratos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Contrato> buscarPorId(@PathVariable long id) {
        Contrato contrato = contratoService.buscarPorId(id);
        if (contrato != null) {
            return ResponseEntity.ok(contrato);
        }
        return ResponseEntity.notFound().build(); 
    }

    // 3. CRIAR CONTRATO (POST) -> http://localhost:8080/api/contratos
    @PostMapping
    public ResponseEntity<Contrato> criar(@Valid @RequestBody Contrato contrato) {
        Contrato novoContrato = contratoService.salvar(contrato);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoContrato);
    }

    // 4. ATUALIZAR CONTRATO (PUT) -> http://localhost:8080/api/contratos/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Contrato> atualizar(
            @PathVariable long id,
            @Valid @RequestBody Contrato contratoAtualizado) {

        Contrato contratoExistente = contratoService.buscarPorId(id);

        if (contratoExistente == null) {
            return ResponseEntity.notFound().build();
        }

        contratoAtualizado.setId(id);
        Contrato contratoSalvo = contratoService.salvar(contratoAtualizado);

        return ResponseEntity.ok(contratoSalvo);
    }

    // 5. DELETAR CONTRATO (DELETE) -> http://localhost:8080/api/contratos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable long id) {
        Contrato contratoExistente = contratoService.buscarPorId(id);
        if (contratoExistente == null) {
            return ResponseEntity.notFound().build();
        }
        
        contratoService.deletar(id); 
        return ResponseEntity.noContent().build(); 
    }
}
