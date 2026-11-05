package br.edu.cesar.fmc.gestao_imobiliaria.repository;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface ContratoRepository extends JpaRepository<Contrato, Long> {

}
