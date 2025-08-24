import { useState } from "react";
import styles from '../css/NewTransactionButton.module.css';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setOpen(true)} className={styles.btn}>
        Abrir Popup
      </button>

      {open && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <h2>Olá 👋</h2>
            <p>Esse é um popup no centro da tela!</p>
            <button onClick={() => setOpen(false)} className={`${styles.btn} ${styles.close}`}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
