import styles from '../../css/Login/Login.module.css'
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [erro, setErro] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      await register({
        name: form.name,
        username: form.email,
        password: form.password,
      });

      navigate("/dashboard");
    } catch (error) {
      setErro("Erro ao criar conta: " + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text-2xl font-semibold text-center mb-4">Criar Conta</h2>

        <label>Nome completo</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Seu nome"
          className={styles.inputs}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Seu e-mail"
          className={styles.inputs}
        />

        <label>Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Senha"
          className={styles.inputs}
        />

        <label>Confirmar senha</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          placeholder="Confirme sua senha"
          className={styles.inputs}
        />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button type="submit" className={styles.btn}>Cadastrar</button>

        <div className={styles.links}>
          Já tem conta?
          <p className={styles.linkTexts} onClick={() => navigate("/")}>
             Entrar
          </p>
        </div>
      </form>

      <div className={styles.right}>
        <img src="Orion.png" alt="Ícone Orion" />
        <h1>Orion</h1>
        <p>Clareza para as suas finanças</p>
      </div>
    </div>
  );
}
