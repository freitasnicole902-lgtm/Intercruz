package br.edu.cesar.fmc.gestao_imobiliaria.repository;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    boolean existsByRgCpf(String rgCpf);
    boolean existsByRgCpfAndIdNot(String rgCpf, Long id);
}
