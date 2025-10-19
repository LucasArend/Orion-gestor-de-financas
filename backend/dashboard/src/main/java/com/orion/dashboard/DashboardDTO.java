package com.orion.dashboard;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class DashboardDTO {

    public UsuarioDTO usuario;
    public EconomiaDTO economia;
    public List<TransacaoDTO> transacao;
    public List<MetaDTO> goals;
    public List<TipoTransacaoDTO> tipoTransacao;
    public List<CategoriaDTO> categoria;

    // === USUÁRIO ===
    public static class UsuarioDTO {
        public String nome;
        public String foto;
    }

    // === ECONOMIA ===
    public static class EconomiaDTO {
        public BigDecimal reservaEmergencia;
    }

    // === TRANSACAO ===
    public static class TransacaoDTO {
        public String descricao;
        public BigDecimal valor;
        public LocalDate data_vencimento;
        public String status;
        public String tipoTransacao;
        public String categoria;
    }

    // === TIPO_TRANSAÇÃO ===
    public static class TipoTransacaoDTO {
        public String nome;
    }

    // === CATEGORIA ===
    public static class CategoriaDTO {
        public String nome;
    }

    // === GOALS ===
    public static class MetaDTO {
        public String objective;
        public BigDecimal goal;
        public BigDecimal saved;
        public BigDecimal contribuition;
        public LocalDate expected_data;
        public LocalDate data_forecast;
    }
}
