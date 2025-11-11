package com.t2.apiorion.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class AtualizacaoStatusService {

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @Scheduled(cron = "0 0 0 * * ?")
    public void verificarVencimentos() {
        String sql =
                "UPDATE transacao SET status = 'ATRASADO' " +
                        "WHERE data_vencimento < CURRENT_DATE AND status = 'PENDENTE'";

        try {
            jdbcTemplate.execute(sql);
            System.out.println("Status das transações atualizados para 'ATRASADO' com sucesso.");
        } catch (Exception e) {
            System.out.println("Erro ao atualizar os status das transações: " + e.getMessage());
        }
    }
}
