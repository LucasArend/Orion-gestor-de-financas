package com.t2.apiorion.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.PostConstruct;

@Configuration
public class TriggerConfig {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void criarTrigger() {
        // 🔹 Remove triggers antigos (evita erros ao reiniciar)
        jdbcTemplate.execute("DROP TRIGGER IF EXISTS trigger_atualizar_saldo ON transacao;");
        jdbcTemplate.execute("DROP TRIGGER IF EXISTS trigger_criar_economia_usuario ON usuario;");

        // 🔹 Função para atualizar o saldo da economia
        String functionSqlAtualizarSaldo =
                "CREATE OR REPLACE FUNCTION atualizar_saldo() " +
                        "RETURNS TRIGGER AS $$ " +
                        "BEGIN " +
                        "    IF TG_OP = 'INSERT' THEN " +
                        "        IF NEW.tipo_transacao_id = 1 THEN " +
                        "            UPDATE economia " +
                        "            SET saldo = COALESCE(saldo, 0) + NEW.valor, updated_at = CURRENT_TIMESTAMP " +
                        "            WHERE usuario_id = NEW.usuario_id; " +
                        "        ELSIF NEW.tipo_transacao_id = 2 THEN " +
                        "            UPDATE economia " +
                        "            SET saldo = COALESCE(saldo, 0) - NEW.valor, updated_at = CURRENT_TIMESTAMP " +
                        "            WHERE usuario_id = NEW.usuario_id; " +
                        "        END IF; " +
                        "        RETURN NEW; " +
                        "    ELSIF TG_OP = 'DELETE' THEN " +
                        "        IF OLD.tipo_transacao_id = 1 THEN " +
                        "            UPDATE economia " +
                        "            SET saldo = COALESCE(saldo, 0) - OLD.valor, updated_at = CURRENT_TIMESTAMP " +
                        "            WHERE usuario_id = OLD.usuario_id; " +
                        "        ELSIF OLD.tipo_transacao_id = 2 THEN " +
                        "            UPDATE economia " +
                        "            SET saldo = COALESCE(saldo, 0) + OLD.valor, updated_at = CURRENT_TIMESTAMP " +
                        "            WHERE usuario_id = OLD.usuario_id; " +
                        "        END IF; " +
                        "        RETURN OLD; " +
                        "    END IF; " +
                        "END; $$ LANGUAGE plpgsql;";

        jdbcTemplate.execute(functionSqlAtualizarSaldo);

        String triggerSqlTransacao =
                "CREATE TRIGGER trigger_atualizar_saldo " +
                        "BEFORE INSERT OR DELETE ON transacao " +
                        "FOR EACH ROW " +
                        "EXECUTE FUNCTION atualizar_saldo();";

        jdbcTemplate.execute(triggerSqlTransacao);

        // 🔹 Função para criar economia automaticamente ao cadastrar novo usuário
        String functionSqlCriarEconomia =
                "CREATE OR REPLACE FUNCTION criar_economia_usuario() " +
                        "RETURNS TRIGGER AS $$ " +
                        "BEGIN " +
                        "    INSERT INTO economia (usuario_id, saldo, reserva_de_emergencia, updated_at) " +
                        "    VALUES (NEW.id, 0.0, 0.0, CURRENT_TIMESTAMP); " +
                        "    RETURN NEW; " +
                        "END; $$ LANGUAGE plpgsql;";

        jdbcTemplate.execute(functionSqlCriarEconomia);

        // 🔹 Trigger que cria uma linha em 'economia' após novo usuário ser criado
        String triggerSqlUsuario =
                "CREATE TRIGGER trigger_criar_economia_usuario " +
                        "AFTER INSERT ON usuario " +
                        "FOR EACH ROW " +
                        "EXECUTE FUNCTION criar_economia_usuario();";

        jdbcTemplate.execute(triggerSqlUsuario);

        System.out.println("✅ Triggers e funções criadas com sucesso!");
    }
}
