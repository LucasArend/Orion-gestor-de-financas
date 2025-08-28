package com.orion.dashboard;

import com.orion.lembrete.Lembrete;
import com.orion.lembrete.LembreteRepository;
import com.orion.meta.Meta;
import com.orion.meta.MetaRepository;
import com.orion.transacao.*;
import com.orion.usuario.Usuario;
import com.orion.usuario.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UsuarioRepository usuarioRepo;
    private final LembreteRepository lembreteRepo;
    private final MetaRepository metaRepo;
    private final TransacaoRepository transacaoRepo;

    public DashboardService(UsuarioRepository usuarioRepo,
                            LembreteRepository lembreteRepo,
                            MetaRepository metaRepo,
                            TransacaoRepository transacaoRepo) {
        this.usuarioRepo = usuarioRepo;
        this.lembreteRepo = lembreteRepo;
        this.metaRepo = metaRepo;
        this.transacaoRepo = transacaoRepo;
    }

    public DashboardDTO getDashboard(Long userId) {
        Usuario usuario = usuarioRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Período = mês atual
        YearMonth ym = YearMonth.now();
        LocalDate inicio = ym.atDay(1);
        LocalDate fim = ym.atEndOfMonth();

        BigDecimal rendaTotal = transacaoRepo.somaPorTipoNoPeriodo(userId, TipoTransacao.RECEITA, inicio, fim);
        BigDecimal gastosTotais = transacaoRepo.somaPorTipoNoPeriodo(userId, TipoTransacao.DESPESA, inicio, fim);
        BigDecimal balancoMes = rendaTotal.subtract(gastosTotais);

        // Gastos por categoria (Map<String, BigDecimal>)
        Map<String, BigDecimal> gastosPorCategoria = new LinkedHashMap<>();
        for (Object[] row : transacaoRepo.gastosPorCategoria(userId, inicio, fim)) {
            String categoria = (String) row[0];
            BigDecimal total = (BigDecimal) row[1];
            gastosPorCategoria.put(categoria, total);
        }

        // Lembretes
        var lembretes = lembreteRepo.findByUsuarioIdOrderByDataAsc(userId)
                .stream()
                .map(l -> {
                    DashboardDTO.LembreteDTO dto = new DashboardDTO.LembreteDTO();
                    dto.id = l.getId();
                    dto.titulo = l.getTitulo();
                    dto.data = l.getData();
                    return dto;
                })
                .collect(Collectors.toList());

        // Transações recentes (top 5)
        var transacoesRecentes = transacaoRepo.findTop5ByUsuarioIdOrderByDataDesc(userId)
                .stream()
                .map(t -> {
                    DashboardDTO.TransacaoDTO dto = new DashboardDTO.TransacaoDTO();
                    dto.id = t.getId();
                    dto.descricao = t.getDescricao();
                    dto.categoria = t.getCategoria();
                    dto.valor = t.getValor();
                    dto.tipo = t.getTipo().name();
                    dto.data = t.getData();
                    return dto;
                })
                .collect(Collectors.toList());

        // Metas
        var metas = metaRepo.findByUsuarioId(userId)
                .stream()
                .map(m -> {
                    DashboardDTO.MetaDTO dto = new DashboardDTO.MetaDTO();
                    dto.id = m.getId();
                    dto.descricao = m.getDescricao();
                    dto.valorAlvo = m.getValorAlvo();
                    dto.progresso = m.getProgresso();
                    return dto;
                })
                .collect(Collectors.toList());

        // Monta DTO final
        DashboardDTO out = new DashboardDTO();
        out.nomeUsuario = usuario.getNome();
        out.lembretes = lembretes;
        out.balancoMes = balancoMes;
        out.rendaTotal = rendaTotal;
        out.gastosTotais = gastosTotais;
        out.reservaEmergencia = usuario.getReservaEmergencia();
        out.gastosPorCategoria = gastosPorCategoria;
        out.transacoesRecentes = transacoesRecentes;
        out.metas = metas;
        return out;
    }
}
