import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();

app.use(express.json());

// Simulação de banco de dados (substitua por um banco real)
const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "$2b$10$./8wsqFKqQ4kOrEltbT3fecix9jhkjjSVoDTAXJt.a0HdPRBe0q0m",
  },
];

// Chave secreta para JWT (armazene em variável de ambiente em produção)
const JWT_SECRET = "sua-chave-secreta-muito-segura";

// Endpoint de login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Requisição recebida:", { email, password });

    // Validação de entrada
    if (!email || !password) {
      console.log("Erro: E-mail ou senha ausentes");
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    // Validar formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Erro: Formato de e-mail inválido", email);
      return res.status(400).json({ error: "Formato de e-mail inválido" });
    }

    // Buscar usuário
    const user = users.find((u) => u.email === email);
    console.log("Usuário encontrado:", user);
    if (!user) {
      console.log("Erro: E-mail não encontrado", email);
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Senha válida:", isPasswordValid);
    if (!isPasswordValid) {
      console.log("Erro: Senha incorreta para", email);
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default app;
