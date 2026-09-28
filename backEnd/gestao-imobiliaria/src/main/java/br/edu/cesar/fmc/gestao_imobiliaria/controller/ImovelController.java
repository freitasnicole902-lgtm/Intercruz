package br.edu.cesar.fmc.gestao_imobiliaria.controller;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Imovel;
import br.edu.cesar.fmc.gestao_imobiliaria.model.dto.DashboardDTO;
import br.edu.cesar.fmc.gestao_imobiliaria.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ImovelController {

    private final ImovelService imovelService;

    @Autowired
    public ImovelController(ImovelService imovelService) {
        this.imovelService = imovelService;
    }

    @GetMapping("/imoveis")
    public ResponseEntity<List<Imovel>> listarImoveis() {
        return ResponseEntity.ok(imovelService.listarTodos());
    }

    @PostMapping("/imoveis")
    public ResponseEntity<Imovel> cadastrarImovel(@RequestBody Imovel imovel) {
        Imovel novoImovel = imovelService.salvar(imovel);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoImovel);
    }

    @DeleteMapping("/imoveis/{id}")
    public ResponseEntity<Void> excluirImovel(@PathVariable Long id) {
        imovelService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dashboard/indicadores")
    public ResponseEntity<DashboardDTO> obterIndicadores() {
        return ResponseEntity.ok(imovelService.obterEstatisticasDashboard());
    }
}