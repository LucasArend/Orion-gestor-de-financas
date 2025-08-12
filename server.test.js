import request from "supertest";
import jwt from "jsonwebtoken";
import app from "./server.js";

describe("POST /login", () => {
  // Teste de login bem-sucedido
  test("deve retornar um token para credenciais válidas", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "user@example.com", password: "password123" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");

    // Verificar o conteúdo do token
    const decoded = jwt.verify(
      response.body.token,
      "sua-chave-secreta-muito-segura"
    );
    expect(decoded).toHaveProperty("userId", 1);
    expect(decoded).toHaveProperty("email", "user@example.com");
    expect(decoded).toHaveProperty("iat");
    expect(decoded).toHaveProperty("exp");
  });

  // Teste de e-mail inválido
  test("deve retornar erro 401 para e-mail inválido", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "wrong@example.com", password: "password123" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Credenciais inválidas" });
  });

  // Teste de senha inválida
  test("deve retornar erro 401 para senha inválida", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "user@example.com", password: "wrongpassword" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Credenciais inválidas" });
  });

  // Teste de entrada faltando
  test("deve retornar erro 400 para e-mail faltando", async () => {
    const response = await request(app)
      .post("/login")
      .send({ password: "password123" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "E-mail e senha são obrigatórios" });
  });

  // Teste de formato de e-mail inválido
  test("deve retornar erro 400 para e-mail com formato inválido", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "invalid-email", password: "password123" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Formato de e-mail inválido" });
  });

  // Teste de erro interno (simulando falha, se aplicável)
  test("deve retornar erro 500 para falha interna", async () => {
    // Para testar isso, você precisaria simular um erro, como mockar bcrypt para falhar
    // Este é um exemplo placeholder
    jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
      throw new Error("Erro simulado");
    });

    const response = await request(app)
      .post("/login")
      .send({ email: "user@example.com", password: "password123" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Erro interno do servidor" });

    // Restaurar o mock
    jest.spyOn(bcrypt, "compare").mockRestore();
  });
});
