package br.edu.cesar.fmc.gestao_imobiliaria.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Documento;

@Repository 
public interface DocumentoRepository extends JpaRepository<Documento, Long> {

}
