import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../../css/Login/Login.module.css';
import { auth, googleProvider } from '../../firebase';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [erro, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const response = await axios.post(
        'URL_BACKEND',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Resposta do backend:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login Google:', error);
      setError('Erro ao fazer login com Google.');
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(form.username, form.password);
      navigate('/dashboard');
    } catch (error) {
      setError('Erro ao fazer login: ' + error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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

        {erro && <p className={styles.erro}>{erro}</p>}

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
        <img alt="Ícone Orion" src="Orion.png" />
        <h1>Orion</h1>
        <p>Clareza para as suas finanças</p>
      </div>
    </div>
  );
}

export default Login;
