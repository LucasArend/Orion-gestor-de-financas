import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../../css/Login/Login.module.css';
import { FcGoogle } from 'react-icons/fc';
import OrionLogo from '../../assets/images/Orion.png';

function Login() {
  const { login, isAuthenticated, loading, setToken, setUser } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

  useEffect(() => {
    // Captura o token da URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Se houver token, armazena no contexto e navega para o dashboard
    if (token) {
      setToken(token);  // Armazena o token no contexto
      navigate('/dashboard');  // Pode navegar para a página de dashboard ou manter-se na mesma
    } else {
      // Se não houver token, redirecionar para o login (caso necessário)
      navigate('/');
    }
  }, [navigate, setToken]);

  const onChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const loginGoogle = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorize/google';
    setToken(googleToken);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("estive no logingoogle")
    try {
      await login(form.username, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login: ' + err.message);
    }
  };

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className={`${styles.container}`}>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className={styles.inputs}
          name="username"
          onChange={onChange}
          placeholder="Digite seu e-mail"
          type="text"
          value={form.username}
        />

        <label htmlFor="password">Senha</label>
        <input
          className={styles.inputs}
          name="password"
          onChange={onChange}
          placeholder="Digite sua senha"
          type="password"
          value={form.password}
        />

        {error && <p className={styles.erro}>{error}</p>}

        <button className={styles.btn} type="submit">
          Entrar
        </button>

        <div className={styles.links}>
          <p
            className={styles.linkTexts}
            onClick={() => navigate('/esqueceu-senha')}
          >
            Esqueceu a senha?
          </p>
          <p className={styles.linkTexts} onClick={() => navigate('/register')}>
            Cadastre-se
          </p>
        </div>

        <div className={styles.line}>ou</div>

        <div className={styles.icons}>
          <span className={styles.google} onClick={loginGoogle}>
            <FcGoogle size={40} />
          </span>
          <p>Google</p>
        </div>
      </form>

      <div className={styles.right}>
        <img alt="Ícone Orion" src={OrionLogo} />
        <h1>Orion</h1>
        <p>Clareza para as suas finanças</p>
      </div>
    </div>
  );
}

export default Login;
