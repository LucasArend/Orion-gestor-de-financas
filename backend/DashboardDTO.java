package com.orion.dashboard;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public class DashboardDTO {
    public String nomeUsuario;
    public List<LembreteDTO> lembretes;
    public BigDecimal balancoMes;
    public BigDecimal rendaTotal;
    public BigDecimal gastosTotais;
    public BigDecimal reservaEmergencia;
    public Map<String, BigDecimal> gastosPorCategoria;
    public List<TransacaoDTO> transacoesRecentes;
    public List<MetaDTO> metas;

    public static class LembreteDTO {
        public Long id;
        public String titulo;
        public LocalDate data;
    }

    public static class TransacaoDTO {
        public Long id;
        public String descricao;
        public String categoria;
        public BigDecimal valor;
        public String tipo; // "RECEITA" | "DESPESA"
        public LocalDate data;
    }

    public static class MetaDTO {
        public Long id;
        public String descricao;
        public BigDecimal valorAlvo;
        public BigDecimal progresso;
    }
}
