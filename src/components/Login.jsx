import { FcGoogle } from "react-icons/fc";
import '../css/login.css'

function Login() {




  return ( 
    <div className='container cardForm'>
      <form className='form'>
        <label htmlFor="email">Email</label>
        <input type="text" placeholder='Digite seu e-mail'/>

        <label htmlFor="password">Senha</label>
        <input type="password" placeholder='Digite sua senha' />

        <button className='btn'>Entrar</button>

        <div className='links'>
        <p className='linkTexts'>Esqueceu a senha?</p>
        <p className='linkTexts'>Cadastre-se</p>
        </div>

        <div className='line'>ou</div>

        <div className='icons'> 
          <span className="google"><FcGoogle size={40}/></span>
          <p>Google</p>
        </div>
      </form>

      <div className='right'>
        <img src="Orion.png" alt="Ícone Orion" />
        <h1>Orion</h1>
        <p>Clareza para as suas finanças</p>
      </div>
    </div>
  );
}

export default Login;