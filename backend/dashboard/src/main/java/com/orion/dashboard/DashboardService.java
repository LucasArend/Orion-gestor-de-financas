package com.orion.dashboard;

import com.orion.economia.Economia;
import com.orion.economia.EconomiaRepository;
import com.orion.meta.Meta;
import com.orion.meta.MetaRepository;
import com.orion.transacao.Transacao;
import com.orion.transacao.TransacaoRepository;
import com.orion.usuario.Usuario;
import com.orion.usuario.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class DashboardService {

    private final UsuarioRepository usuarioRepo;
    private final MetaRepository metaRepo;
    private final TransacaoRepository transacaoRepo;
    private final EconomiaRepository economiaRepo;

    public DashboardService(UsuarioRepository usuarioRepo,
                            MetaRepository metaRepo,
                            TransacaoRepository transacaoRepo,
                            EconomiaRepository economiaRepo) {
        this.usuarioRepo = usuarioRepo;
        this.metaRepo = metaRepo;
        this.transacaoRepo = transacaoRepo;
        this.economiaRepo = economiaRepo;
    }

    public DashboardDTO getDashboardData(Long userId) {
        Usuario usuario = usuarioRepo.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));

        Economia economia = economiaRepo.findByUsuarioId(userId)
                .orElseThrow(() -> new NoSuchElementException("Economia não encontrada para o usuário ID " + userId));

        List<Transacao> transacoes = transacaoRepo.findByUsuarioId(userId);
        List<Meta> metas = metaRepo.findByUsuarioId(userId);

        DashboardDTO dto = new DashboardDTO();

        // === Usuário ===
        dto.usuario = new DashboardDTO.UsuarioDTO();
        dto.usuario.nome = usuario.getNome();
        dto.usuario.foto = usuario.getFoto();

        // === Economia ===
        dto.economia = new DashboardDTO.EconomiaDTO();
        dto.economia.reservaEmergencia = economia.getReservaDeEmergencia();

        // === Transações ===
        dto.transacao = transacoes.stream().map(t -> {
            DashboardDTO.TransacaoDTO td = new DashboardDTO.TransacaoDTO();
            td.descricao = t.getDescricao();
            td.valor = t.getValor();
            td.dataVencimento = t.getDataVencimento(); // camelCase
            td.status = t.getStatus();
            td.tipoTransacao = t.getTipoTransacao() != null ? t.getTipoTransacao().getNome() : null;
            td.categoria = t.getCategoria() != null ? t.getCategoria().getNome() : null;
            return td;
        }).toList();

        // === Metas (Goals) ===
        dto.goals = metas.stream().map(m -> {
            DashboardDTO.MetaDTO md = new DashboardDTO.MetaDTO();
            md.objective = m.getDescricao();
            md.goal = m.getValorAlvo();
            md.saved = m.getProgresso();
            md.contribution = m.getAporteMensal(); // camelCase corrigido
            md.expectedDate = m.getDataEsperada();  // camelCase
            md.dataForecast = m.getDataPrevista();  // camelCase
            return md;
        }).toList();

        return dto;
    }
}
