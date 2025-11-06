package com.t2.apiorion.config;

import com.t2.apiorion.tipoTransacao.dto.TipoTransacaoRequest;
import com.t2.apiorion.tipoTransacao.service.TipoTransacaoService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseInitializer {

    private final TipoTransacaoService tipoTransacaoService;

    public DatabaseInitializer(TipoTransacaoService tipoTransacaoService) {
        this.tipoTransacaoService = tipoTransacaoService;
    }

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {
            String[] tiposIniciais = {"renda", "despesa"};

            for (String tipoNome : tiposIniciais) {
                boolean existe = tipoTransacaoService.findByNome(tipoNome).isPresent();
                if (!existe) {
                    TipoTransacaoRequest request = new TipoTransacaoRequest();
                    request.setNome(tipoNome);
                    tipoTransacaoService.criarTipoTransacao(request);
                    System.out.println("Tipo de transação criado: " + tipoNome);
                }
            }
        };
    }
}
