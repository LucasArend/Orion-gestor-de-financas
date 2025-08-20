import { FcGoogle } from "react-icons/fc";
import styles from "../css/login.module.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Digite seu e-mail.");
      return;
    }

    const emailValidation = /\S+@\S+\.\S+/;
    if (!emailValidation.test(email)) {
      setError("Digite um e-mail válido.");
      return;
    }

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordValidation.test(password)) {
      setError(
        "A senha deve ter pelo menos 6 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula e 1 número."
      );
      return;
    }

    if (!password.trim()) {
      setError("Digite sua senha.");
      return;
    }

    const success = await login(email, password);

    if (!success) {
      setError("Email ou senha inválidos");
    } else {
      setError("");
      navigate("/Dashboard");
    }
  };

  return (
    <div className={`${styles.container} ${styles.cardForm}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Senha
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className={styles.input}
        />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button type="submit" className={styles.btn}>
          Entrar
        </button>

        <div className={styles.links}>
          <p
            className={styles.linkTexts}
            onClick={() => navigate("/esqueceu-senha")}
          >
            Esqueceu a senha?
          </p>
          <p
            className={styles.linkTexts}
            onClick={() => navigate("/cadastro")}
          >
            Cadastre-se
          </p>
        </div>

        <div className={styles.line}>ou</div>

        <div className={styles.icons}>
          <span className={styles.google}>
            <FcGoogle size={40} />
          </span>
          <p>Google</p>
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

export default Login;
