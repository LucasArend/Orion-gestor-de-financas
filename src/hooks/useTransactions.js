import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export function useTransactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/transacoes/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar transações");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error("Erro ao buscar transações:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  return { transactions, loading, error };
}
