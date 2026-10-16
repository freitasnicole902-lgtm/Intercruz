package br.edu.cesar.fmc.gestao_imobiliaria.controller;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Imovel;
import br.edu.cesar.fmc.gestao_imobiliaria.service.ImovelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/imoveis")
@CrossOrigin(origins = "*") 
public class ImovelController {

    private final ImovelService imovelService;

    public ImovelController(ImovelService imovelService) {
        this.imovelService = imovelService;
    }

    // Criar
    @PostMapping
    public ResponseEntity<Imovel> cadastrar(@RequestBody Imovel imovel) {
        // CORRIGIDO: Remoção da aspa escapada extra (\") para fechar a String corretamente
        System.out.println(">>> REQUISIÇÃO RECEBIDA NO BACKEND: " + imovel.getTitulo());
        
        Imovel novoImovel = imovelService.salvar(imovel);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoImovel);
    }

    // Listar todos
    @GetMapping
    public ResponseEntity<List<Imovel>> listarTodos() {
        List<Imovel> imoveis = imovelService.listarTodos();
        return ResponseEntity.ok(imoveis);
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Imovel> buscarPorId(@PathVariable Long id) {
        return imovelService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar
    @PutMapping("/{id}")
    public ResponseEntity<Imovel> atualizar(@PathVariable Long id, @RequestBody Imovel imovelAtualizado) {
        return imovelService.buscarPorId(id)
                .map(imovelExistente -> {
                    imovelAtualizado.setId(id);
                    Imovel imovelSalvo = imovelService.salvar(imovelAtualizado);
                    return ResponseEntity.ok(imovelSalvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (imovelService.buscarPorId(id).isPresent()) {
            imovelService.deletar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}