package com.orion.dashboard;

import com.orion.categoria.CategoriaRepository;
import com.orion.economia.Economia;
import com.orion.economia.EconomiaRepository;
import com.orion.meta.Meta;
import com.orion.meta.MetaRepository;
import com.orion.transacao.Transacao;
import com.orion.transacao.TransacaoRepository;
import com.orion.tipoTransacao.TipoTransacaoRepository;
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
    private final TipoTransacaoRepository tipoTransacaoRepo;
    private final CategoriaRepository categoriaRepo;

    public DashboardService(UsuarioRepository usuarioRepo,
                            MetaRepository metaRepo,
                            TransacaoRepository transacaoRepo,
                            EconomiaRepository economiaRepo,
                            TipoTransacaoRepository tipoTransacaoRepo,
                            CategoriaRepository categoriaRepo) {
        this.usuarioRepo = usuarioRepo;
        this.metaRepo = metaRepo;
        this.transacaoRepo = transacaoRepo;
        this.economiaRepo = economiaRepo;
        this.tipoTransacaoRepo = tipoTransacaoRepo;
        this.categoriaRepo = categoriaRepo;
    }

    public DashboardDTO getDashboardData(Long userId) {
        Usuario usuario = usuarioRepo.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado"));

        Economia economia = economiaRepo.findByUsuarioId(userId)
                .orElseThrow(() -> new NoSuchElementException("Economia não encontrada para o usuário ID " + userId));

        // Busca todas as transações do usuário sem filtros
        List<Transacao> transacao = transacaoRepo.findByUsuarioId(userId);

        List<Meta> metas = metaRepo.findByUsuarioId(userId);

        DashboardDTO dto = new DashboardDTO();

        // === Usuário ===
        dto.usuario = new DashboardDTO.UsuarioDTO();
        dto.usuario.nome = usuario.getNome();
        dto.usuario.foto = usuario.getFoto();

        // === Economia ===
        dto.economia = new DashboardDTO.EconomiaDTO();
        dto.economia.reservaEmergencia = economia.getReservaDeEmergencia();

        // === Transacao ===
        dto.transacao = transacao.stream().map(t -> {
            DashboardDTO.TransacaoDTO td = new DashboardDTO.TransacaoDTO();
            td.descricao = t.getDescricao();
            td.valor = t.getValor();
            td.data_vencimento = t.getDataVencimento();
            td.status = t.getStatus(); // Mantém exatamente como no DB
            td.tipoTransacao = t.getTipoTransacao() != null ? t.getTipoTransacao().getNome() : null;
            td.categoria = t.getCategoria() != null ? t.getCategoria().getNome() : null;
            return td;
        }).toList();

        // === Goals ===
        dto.goals = metas.stream().map(m -> {
            DashboardDTO.MetaDTO md = new DashboardDTO.MetaDTO();
            md.objective = m.getDescricao();
            md.goal = m.getValorAlvo();
            md.saved = m.getProgresso();
            md.contribuition = m.getAporteMensal();
            md.expected_data = m.getDataEsperada();
            md.data_forecast = m.getDataPrevista();
            return md;
        }).toList();

        // === Tipo_Transacao ===
        dto.tipoTransacao = tipoTransacaoRepo.findAll().stream().map(tt -> {
            DashboardDTO.TipoTransacaoDTO ttd = new DashboardDTO.TipoTransacaoDTO();
            ttd.nome = tt.getNome();
            return ttd;
        }).toList();

        // === Categoria ===
        dto.categoria = categoriaRepo.findAll().stream().map(c -> {
            DashboardDTO.CategoriaDTO cd = new DashboardDTO.CategoriaDTO();
            cd.nome = c.getNome();
            return cd;
        }).toList();

        return dto;
    }
}
