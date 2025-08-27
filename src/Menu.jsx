import { Link } from "react-router-dom";

function Menu() {
  return (
    <nav>
      <Link to="/">Login</Link>
      <Link to="/transacao">Transações</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/register">Registrar</Link>
    </nav>
  );
}

export default Menu;