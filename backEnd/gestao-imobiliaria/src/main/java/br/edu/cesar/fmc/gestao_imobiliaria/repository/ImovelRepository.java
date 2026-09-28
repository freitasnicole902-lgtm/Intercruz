package br.edu.cesar.fmc.gestao_imobiliaria.repository;

import br.edu.cesar.fmc.gestao_imobiliaria.model.Imovel;
import br.edu.cesar.fmc.gestao_imobiliaria.model.enums.SituacaoImovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImovelRepository extends JpaRepository<Imovel, Long> {
    long countBySituacao(SituacaoImovel situacao);
}