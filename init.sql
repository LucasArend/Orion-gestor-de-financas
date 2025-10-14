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

CREATE TABLE tipo_transacao (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50)
);

CREATE TABLE categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    usuario_id INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

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

CREATE TABLE transacao (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    tipo_transacao_id INT,
    categoria_id INT,
    descricao TEXT,
    valor NUMERIC(15,2),
    data_vencimento DATE,
    data_criacao TIMESTAMP,
    quantidade_parcelas INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (tipo_transacao_id) REFERENCES tipo_transacao(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE economia (
    id INT PRIMARY KEY,
    saldo NUMERIC(15,2) NOT NULL DEFAULT 0,
    reserva_de_emergencia NUMERIC(15,2) NOT NULL DEFAULT 0,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);