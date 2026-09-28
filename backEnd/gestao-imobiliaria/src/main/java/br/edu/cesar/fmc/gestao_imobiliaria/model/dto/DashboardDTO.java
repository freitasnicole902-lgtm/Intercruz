package br.edu.cesar.fmc.gestao_imobiliaria.model.dto;

public class DashboardDTO {
    private long totalImoveis;
    private long imoveisAlugados;
    private long imoveisDisponiveis;
    private long contratosAtivos;

    public DashboardDTO(long totalImoveis, long imoveisAlugados, long imoveisDisponiveis, long contratosAtivos) {
        this.totalImoveis = totalImoveis;
        this.imoveisAlugados = imoveisAlugados;
        this.imoveisDisponiveis = imoveisDisponiveis;
        this.contratosAtivos = contratosAtivos;
    }

    public long getTotalImoveis() { return totalImoveis; }
    public long getImoveisAlugados() { return imoveisAlugados; }
    public long getImoveisDisponiveis() { return imoveisDisponiveis; }
    public long getContratosAtivos() { return contratosAtivos; }
}