package br.edu.cesar.fmc.gestao_imobiliaria.service;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Documento;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.DocumentoRepository;
import br.edu.cesar.fmc.gestao_imobiliaria.repository.ImovelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service 
public class DocumentoService {
    //@Autowired 
    private DocumentoRepository documentoRepository;

    public DocumentoService(DocumentoRepository documentoRepository) {
        this.documentoRepository = documentoRepository;
    }
    

    public List<Documento> listarTodos() {
        return documentoRepository.findAll();
    }

    public Documento buscarPorId(Long id) { 
        return documentoRepository.findById(id).orElse(null);
    }

    public Documento salvar(Documento documento) {
        return documentoRepository.save(documento);
    }

    public void deletar(Long id) {
        documentoRepository.deleteById(id);
    }

}
