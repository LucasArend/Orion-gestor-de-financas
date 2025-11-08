import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "../../css/common/Calendario.module.css";

function Calendario({ value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modoMes, setModoMes] = useState(false);
  const [mesVisivel, setMesVisivel] = useState(new Date());
  const [anoSelecionado, setAnoSelecionado] = useState(new Date().getFullYear());
  const containerRef = useRef(null);

  const meses = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec",
  ];

  function toggleCalendar() {
    setIsOpen((prev) => !prev);
    setModoMes(false); 
  }

  function handleSelecionarMes(index) {
    const novaData = new Date(anoSelecionado, index, 1);
    setMesVisivel(novaData);
    setModoMes(false); 
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setModoMes(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        <input
          type="text"
          readOnly
          className={styles.input}
          onClick={toggleCalendar}
          value={value ? value.toLocaleDateString() : ""}
          placeholder="Selecione uma data"
        />

        {isOpen && (
          <div className={`${styles.picker} ${styles.visible}`}>
            <div className={styles.switcher}>
              <button onClick={() => setModoMes((prev) => !prev)}>
                {modoMes ? "Selecionar dia" : "Selecionar mês"}
              </button>
            </div>

            {modoMes ? (
              <div className={styles.monthPicker}>
                <div className={styles.header}>
                  <button onClick={() => setAnoSelecionado((year) => year - 1)}>‹</button>
                  <span>{anoSelecionado}</span>
                  <button onClick={() => setAnoSelecionado((year) => year + 1)}>›</button>
                </div>

                <div className={styles.monthGrid}>
                  {meses.map((mes, index) => (
                    <button
                      key={index}
                      className={`${styles.month} ${
                        value?.getFullYear() === anoSelecionado &&
                        value?.getMonth() === index
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handleSelecionarMes(index)}
                    >
                      {mes}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <DayPicker
                mode="single"
                selected={value}
                month={mesVisivel}
                onMonthChange={setMesVisivel}
                onSelect={(date) => {
                  onChange(date);
                  setIsOpen(false);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendario;
