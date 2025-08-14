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

        <p className='lostPass'>Esqueceu a senha?</p>
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