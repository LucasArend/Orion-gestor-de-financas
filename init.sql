-- Tabela de usuários
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha TEXT NOT NULL,
    foto TEXT,
    google_id TEXT,
    provedor VARCHAR(50) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tipos de transação (ex: receita, despesa)
CREATE TABLE tipo_transacao (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50)
);

-- Categorias vinculadas a usuário
CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    usuario_id INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- Goals
CREATE TABLE goal (
    id SERIAL PRIMARY KEY,
    user_id INT,
    objective VARCHAR(255) NOT NULL,
    goal NUMERIC(12,2) NOT NULL,
    saved NUMERIC(12,2) NOT NULL,
    data TIMESTAMP,
    expected_data DATE,
    data_forecast DATE,
    contribution NUMERIC(12,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES usuario(id)
);

-- Tabela transacao com atualizado_em e status
CREATE TABLE transacao (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    tipo_transacao_id INT,
    categoria_id INT,
    descricao TEXT,
    valor NUMERIC(15,2),
    data_vencimento DATE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantidade_parcelas INT,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pendente',
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (tipo_transacao_id) REFERENCES tipo_transacao(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

-- Economia (corrigido para incluir usuario_id)
CREATE TABLE economia (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    saldo NUMERIC(15,2) NOT NULL DEFAULT 0,
    reserva_de_emergencia NUMERIC(15,2) NOT NULL DEFAULT 0,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Função para atualizar atualizado_em automaticamente
CREATE OR REPLACE FUNCTION atualizar_data_modificacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para chamar a função antes do UPDATE em transacao
CREATE TRIGGER trigger_atualizado_em
BEFORE UPDATE ON transacao
FOR EACH ROW
EXECUTE FUNCTION atualizar_data_modificacao();
