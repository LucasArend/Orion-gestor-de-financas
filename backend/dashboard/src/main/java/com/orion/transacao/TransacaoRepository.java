package com.orion.transacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    @Query("""
        SELECT COALESCE(SUM(t.valor), 0)
        FROM Transacao t
        WHERE t.usuario.id = :userId
          AND t.tipo = :tipo
          AND t.data BETWEEN :inicio AND :fim
    """)
    BigDecimal somaPorTipoNoPeriodo(@Param("userId") Long userId,
                                    @Param("tipo") TipoTransacao tipo,
                                    @Param("inicio") LocalDate inicio,
                                    @Param("fim") LocalDate fim);

    @Query("""
        SELECT t.categoria, COALESCE(SUM(t.valor), 0)
        FROM Transacao t
        WHERE t.usuario.id = :userId
          AND t.tipo = com.orion.transacao.TipoTransacao.DESPESA
          AND t.data BETWEEN :inicio AND :fim
        GROUP BY t.categoria
    """)
    List<Object[]> gastosPorCategoria(@Param("userId") Long userId,
                                      @Param("inicio") LocalDate inicio,
                                      @Param("fim") LocalDate fim);

    List<Transacao> findTop5ByUsuarioIdOrderByDataDesc(Long userId);
}
