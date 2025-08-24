import styles from '../css/Login.module.css'
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase'
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erro, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()

      const response = await axios.post(
        "URL_BACKEND",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      console.log("Resposta do backend:", response.data)

    } catch (error) {
      console.error("Erro no login Google:", error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email.trim()) {
      setError("Digite seu e-mail.")
      return
    }

    const emailValidation = /\S+@\S+\.\S+/
    if (!emailValidation.test(email)) {
      setError("Digite um e-mail válido.")
      return
    }

    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
    if (!passwordValidation.test(password)) {
      setError("A senha deve ter pelo menos 6 caracteres, incluindo 1 letra maiúscula, 1 letra minúscula e 1 número.")
      return
    }

    if (!password.trim()) {
      setError("Digite sua senha.")
      return
    }

    const success = await login(email, password)

    if (!success) {
      setError("Email ou senha inválidos")
    } else {
      setError("")
      navigate("/Dashboard")
    }
  }

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Digite seu e-mail'
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Digite sua senha'
        />

        {erro && <p className={styles.erro}>{erro}</p>}

        <button type="submit" className={styles.btn}>Entrar</button>

        <div className={styles.links}>
          <p className={styles.linkTexts} onClick={() => navigate("/esqueceu-senha")}>Esqueceu a senha?</p>
          <p className={styles.linkTexts} onClick={() => navigate("/register")}>Cadastre-se</p>
        </div>

        <div className={styles.line}>ou</div>

        <div className={styles.icons}>
          <span className={styles.google} onClick={loginGoogle}><FcGoogle size={40} /></span>
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
