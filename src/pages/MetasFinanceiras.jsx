import React, { useState } from "react";

export default function MetasFinanceiras() {
  const [metas, setMetas] = useState([
    {
      objetivo: "Viagem",
      meta: 4000,
      poupanca: 3200,
      contribuicao: 100,
      previsao: "2025-09-01",
      dataAlmejada: "2026-02-01",
    },
  ]);

  const [novaMeta, setNovaMeta] = useState({
    objetivo: "",
    meta: "",
    poupanca: "",
    contribuicao: "",
    previsao: "",
    dataAlmejada: "",
  });

  const formatarReal = (valor) =>
    Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const adicionarMeta = () => {
    if (!novaMeta.objetivo) return alert("Digite o objetivo!");
    setMetas([...metas, novaMeta]);
    setNovaMeta({
      objetivo: "",
      meta: "",
      poupanca: "",
      contribuicao: "",
      previsao: "",
      dataAlmejada: "",
    });
  };

  const excluirMeta = (index) => {
    const novasMetas = metas.filter((_, i) => i !== index);
    setMetas(novasMetas);
  };

  return (
    <div style={{ padding: "20px", background: "#121212", minHeight: "100vh", color: "#fff" }}>
      <h2>Metas Financeiras</h2>

      {/* Formulário de nova meta */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", marginBottom: "15px" }}>
        <input
          placeholder="Objetivo"
          value={novaMeta.objetivo}
          onChange={(e) => setNovaMeta({ ...novaMeta, objetivo: e.target.value })}
        />
        <input
          type="number"
          placeholder="Meta (R$)"
          value={novaMeta.meta}
          onChange={(e) => setNovaMeta({ ...novaMeta, meta: e.target.value })}
        />
        <input
          type="number"
          placeholder="Poupança (R$)"
          value={novaMeta.poupanca}
          onChange={(e) => setNovaMeta({ ...novaMeta, poupanca: e.target.value })}
        />
        <input
          type="number"
          placeholder="Contribuição (R$)"
          value={novaMeta.contribuicao}
          onChange={(e) => setNovaMeta({ ...novaMeta, contribuicao: e.target.value })}
        />
        <input
          type="date"
          value={novaMeta.previsao}
          onChange={(e) => setNovaMeta({ ...novaMeta, previsao: e.target.value })}
        />
        <input
          type="date"
          value={novaMeta.dataAlmejada}
          onChange={(e) => setNovaMeta({ ...novaMeta, dataAlmejada: e.target.value })}
        />
      </div>

      <button
        onClick={adicionarMeta}
        style={{
          background: "#1E90FF",
          color: "#fff",
          padding: "8px 15px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "15px",
          fontWeight: "bold"
        }}
      >
        + Add Meta
      </button>

      {/* Tabela de metas */}
      <table style={{ width: "50%", borderCollapse: "separate", borderSpacing: "10px 10px" }}>
        <thead>
          <tr>
            <th>Objetivo</th>
            <th>Meta</th>
            <th>Poupança</th>
            <th>Contribuição</th>
            <th>Previsão</th>
            <th>Data Almejada</th>
          </tr>
        </thead>
        <tbody>
          {metas.map((meta, index) => (
            <tr key={index}>
              <td>{meta.objetivo}</td>
              <td>{formatarReal(meta.meta)}</td>
              <td>{formatarReal(meta.poupanca)}</td>
              <td>{formatarReal(meta.contribuicao)}</td>
              <td>{new Date(meta.previsao).toLocaleDateString("pt-BR")}</td>
              <td>{new Date(meta.dataAlmejada).toLocaleDateString("pt-BR")}</td>
              <td>
                <button
                  onClick={() => excluirMeta(index)}
                  style={{
                    background: "#FF4B4B",
                    color: "#fff",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
