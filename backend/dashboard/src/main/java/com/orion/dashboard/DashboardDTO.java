package com.orion.dashboard;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class DashboardDTO {

    public UsuarioDTO usuario;
    public EconomiaDTO economia;
    public List<TransacaoDTO> transacao;
    public List<MetaDTO> goals;

    public static class UsuarioDTO {
        public String nome;
        public String foto;
    }

    public static class EconomiaDTO {
        public BigDecimal reservaEmergencia;
    }

    public static class TransacaoDTO {
        public String descricao;
        public BigDecimal valor;
        public LocalDate dataVencimento;
        public String status;
        public String tipoTransacao;
        public String categoria;
    }

    public static class MetaDTO {
        public String objective;
        public BigDecimal goal;
        public BigDecimal saved;
        public BigDecimal contribution;
        public LocalDate expectedDate;
        public LocalDate dataForecast;
    }
}
