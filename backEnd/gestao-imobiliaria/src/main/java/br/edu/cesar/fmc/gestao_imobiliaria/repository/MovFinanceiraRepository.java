
package br.edu.cesar.fmc.gestao_imobiliaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.cesar.fmc.gestao_imobiliaria.model.MovFinanceira;

@Repository
public interface MovFinanceiraRepository
        extends JpaRepository<MovFinanceira, Long> {
}
