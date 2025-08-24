import React, { useState } from "react";
import styles from "../css/Register.module.css"; // importando módulo css
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState("");

  function cadastrar(event) {
    event.preventDefault();

    if (!nome || !email || !senha || !confirma) {
      setErro("Preencha todos os campos.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErro("E-mail inválido.");
    } else if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
    } else if (senha !== confirma) {
      setErro("As senhas não coincidem.");
    } else {
      setErro("");
      alert("Cadastro realizado com sucesso!");
      console.log({ nome, email, senha });
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormSection}>
        <div className={styles.loginBox}>
          <h2>Criar Conta</h2>

          {erro && <p className={styles.error}>{erro}</p>}

          <form className={styles.form} onSubmit={cadastrar}>
            <label>Nome completo</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Senha</label>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <label>Confirmar senha</label>
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirma}
              onChange={(e) => setConfirma(e.target.value)}
            />

            <button className={styles.btnEnter} type="submit">
              Cadastrar
            </button>
          </form>

          <div className={styles.loginLinks}>
            <span>Já tem conta?</span>
            <a href="#">Entrar</a>
          </div>

          {/* <div className={styles.divider}>
            <span>OU</span>
          </div>

          <div className={styles.socialLogin}>
            <button className={`${styles.btnSocial} ${styles.facebook}`}>
              <FaFacebookF size={20} />
            </button>
            <button className={`${styles.btnSocial} ${styles.google}`}>
              <FaGoogle size={20} />
            </button>
            <button className={`${styles.btnSocial} ${styles.twitter}`}>
              <FaTwitter size={20} />
            </button>
          </div> */}
        </div>
      </div>

      <div className={styles.loginBrandSection}>
        <div className={styles.right}>
          <img src="Orion.png" alt="Ícone Orion" />
          <h1>Orion</h1>
          <p>Clareza para as suas finanças</p>
        </div>
      </div>
    </div>
  );
}
