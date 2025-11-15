import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AddGoalModal from "../components/Goals/add-goal-modal";
import GoalsFilters from "../components/Goals/goals-filters";
import GoalsHeader from "../components/Goals/goals-header";
import GoalsTable from "../components/Goals/goals-table";
import Notification from "../components/Notications/notifications";
import { fieldOptions, valueOptions } from "../data/goals-options";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/Common/ConfirmModal";
import axios from "axios";

export default function Goals() {
  const { token } = useAuth();
  const [metas, setMetas] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [campo, setCampo] = useState("");
  const [ordem, setOrdem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteMetaId, setDeleteMetaId] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const handleEditClick = (id) => {
    const goalToEdit = metas.find((m) => m.id === id);

    if (goalToEdit) {
      setEditingGoal(goalToEdit);
      setIsModalOpen(true);
    }
  };

  const putGoals = async (id, updateGoalData) => {
    setLoading(true);

    if (!updateGoalData || !token) {
      showNotification("error", "Dados da meta ausentes ou inválidos.");
      setLoading(false);
      return;
    }

    try {
      const URL = `http://localhost:8080/goals/${id}`;
      await axios.put(URL, updateGoalData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchGoals();
    } catch (error) {
      console.error("Erro ao editar meta: ", error);
      throw error;
    }
  };

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const URL = "http://localhost:8080/goals";
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMetas(response.data);
    } catch (error) {
      console.log("Erro ao buscar metas: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteMetaId(id);
    setConfirmModalOpen(true);
  };

  async function handleConfirmDelete() {
    if (!token || !deleteMetaId) return;

    const idToDelete = deleteMetaId;

    try {
      const URL = `http://localhost:8080/goals/${idToDelete}`;
      await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMetas((prev) => prev.filter((m) => m.id !== idToDelete));

      showNotification("success", "Meta removida com sucesso!");
      setConfirmModalOpen(false);
    } catch {
      showNotification("error", "Erro ao remover meta!");
    } finally {
      setDeleteMetaId(null);
    }
  }

  useEffect(() => {
    if (token) {
      fetchGoals();
    }
  }, [token]);

  const handleGoalSaved = (status) => {
    let message = "Meta salva com sucesso!";

    if (status === "edited") {
      message = "Meta editada com sucesso!";
    } else if (status === "added") {
      message = "Meta adicionada com sucesso!";
    }

    showNotification("success", message);

    setIsModalOpen(false);
    fetchGoals();
  };

  const filteredMetas = metas
    .filter((m) =>
      (m.objective || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!(campo && ordem)) {
        return 0;
      }
      const valueA = campo === "goal" ? a.goal : new Date(a[campo]);
      const valueB = campo === "goal" ? b.goal : new Date(b[campo]);

      if (ordem === "asc") {
        return valueA > valueB ? 1 : -1;
      }
      return valueA < valueB ? 1 : -1;
    });

  return (
    <div className="space-y-6 rounded-lg bg-white p-8">
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* 1. Cabeçalho */}
      <GoalsHeader onAddGoalClick={() => setIsModalOpen(true)} />

      {/* 2. Filtros */}
      <GoalsFilters
        field={campo}
        fieldOptions={fieldOptions}
        order={ordem}
        search={search}
        setField={setCampo}
        setOrder={setOrdem}
        setSearch={setSearch}
        valueOptions={valueOptions}
      />

      {/* 3. Tabela de Metas */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Carregando metas...</p>
      ) : filteredMetas.length === 0 ? (
        <div className="text-center py-10 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-xl font-semibold text-gray-700 mb-2">
            Nenhuma meta encontrada
          </p>
          <p className="text-gray-500">
            Comece a planejar seu futuro! Clique em <strong>Adicionar Meta</strong> para
            criar seu primeiro objetivo.
          </p>
        </div>
      ) : (
        <GoalsTable
          metas={filteredMetas}
          onRemove={handleDeleteClick}
          onEdit={handleEditClick}
        />
      )}

      {/* 4. Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddGoalModal
            key="modal"
            onClose={() => {
              setIsModalOpen(false);
              setEditingGoal(null);
            }}
            onSuccess={handleGoalSaved}
            onError={() => showNotification("error", "Erro ao salvar meta.")}
            initialData={editingGoal}
            onEditSubmit={putGoals}
          />
        )}
      </AnimatePresence>

      {/* Modal de confirmação */}
      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remover Meta"
        message="Tem certeza que deseja remover esta meta?"
      />
    </div>
  );
}
