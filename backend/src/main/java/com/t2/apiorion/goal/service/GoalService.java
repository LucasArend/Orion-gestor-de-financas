package com.t2.apiorion.goal.service;

import com.t2.apiorion.goal.Goal;
import com.t2.apiorion.goal.GoalRepository;
import com.t2.apiorion.goal.dto.GoalRequest;
import com.t2.apiorion.transacao.Transacao;
import com.t2.apiorion.transacao.StatusTransacao;
import com.t2.apiorion.transacao.TransacaoRepository;
import com.t2.apiorion.categoria.Categoria;
import com.t2.apiorion.categoria.CategoriaRepository;
import com.t2.apiorion.tipoTransacao.TipoTransacao;
import com.t2.apiorion.tipoTransacao.TipoTransacaoRepository;
import com.t2.apiorion.user.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final TransacaoRepository transacaoRepository;
    private final CategoriaRepository categoriaRepository;
    private final TipoTransacaoRepository tipoTransacaoRepository;

    public GoalService(
            GoalRepository goalRepository,
            UserRepository userRepository,
            TransacaoRepository transacaoRepository,
            CategoriaRepository categoriaRepository,
            TipoTransacaoRepository tipoTransacaoRepository
    ) {
        this.goalRepository = goalRepository;
        this.userRepository = userRepository;
        this.transacaoRepository = transacaoRepository;
        this.categoriaRepository = categoriaRepository;
        this.tipoTransacaoRepository = tipoTransacaoRepository;
    }

    @Transactional
    public Goal criarMeta(Long userId, GoalRequest goalRequest) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Goal goal = new Goal();
        goal.setUser(user);
        goal.setObjective(goalRequest.getObjective());
        goal.setGoal(goalRequest.getGoal());
        goal.setSaved(BigDecimal.ZERO);
        goal.setContribution(goalRequest.getContribution());
        goal.setExpectedData(goalRequest.getExpectedData());
        goal.setGoalDate(goalRequest.getGoalDate());

        return goalRepository.save(goal);
    }

    @Transactional
    public Goal adicionarContribuicao(Long userId, Long goalId, BigDecimal valorContribuicao) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Meta não encontrada ou usuário não autorizado"));

        goal.addContribution(valorContribuicao);
        return goalRepository.save(goal);
    }

    @Transactional
    public Goal aplicarContribuicao(Long userId, Long goalId) {
        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new RuntimeException("Meta não encontrada ou usuário não autorizado"));

        goal.setSaved(goal.getSaved().add(goal.getContribution()));
        goalRepository.save(goal);

        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Categoria categoriaMetas = categoriaRepository.findByNomeAndUsuarioIsNull("Metas")
                .orElseThrow(() -> new RuntimeException("Categoria 'Metas' não encontrada"));


        TipoTransacao tipo = tipoTransacaoRepository.findByNome("DESPESA")
                .orElseThrow(() -> new RuntimeException("Tipo de transação 'Saída' não encontrado"));

        Transacao transacao = new Transacao();
        transacao.setUsuario(user);
        transacao.setCategoria(categoriaMetas);
        transacao.setTipoTransacao(tipo);
        transacao.setDescricao(goal.getObjective());
        transacao.setValor(goal.getContribution());
        transacao.setQuantidadeParcelas(1);
        transacao.setDataVencimento(Instant.now());
        transacao.setStatus(StatusTransacao.CONCLUIDO);

        transacaoRepository.save(transacao);

        return goal;
    }
}
