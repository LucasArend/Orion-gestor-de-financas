import { useState } from "react";
import "./NewTransactionButton.css"; 

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setOpen(true)} className="btn">
        Abrir Popup
      </button>

      {open && (
        <div className="overlay">
          <div className="popup">
            <h2>Olá 👋</h2>
            <p>Esse é um popup no centro da tela!</p>
            <button onClick={() => setOpen(false)} className="btn close">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}