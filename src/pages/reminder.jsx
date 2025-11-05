import axios from 'axios';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import Notification from '../components/Notications/notifications';
import AddModalReminder from '../components/Reminder/add-reminder-modal';
import ReminderCard from '../components/Reminder/reminder-card';
import ReminderFilter from '../components/Reminder/reminder-filter';

export default function Reminder() {
  const [reminders, setReminders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [filtered, setFiltered] = useState([]);

  //Quando tiver o backend tirar ele
  useEffect(() => {
    const mock = [
      {
        id: 1,
        descricao: 'Renovar CNH',
        data: '2025-11-06T18:00',
      },
      {
        id: 2,
        descricao: 'Pagar aluguel',
        data: '2025-10-31T17:15',
      },
      {
        id: 3,
        descricao: 'Pagar conta de luz',
        data: '2025-11-30T17:15',
      },
      {
        id: 4,
        descricao: 'Pagar compras internet',
        data: '2025-12-10T20:15',
      },
    ];
    setReminders(mock);
    setFiltered(mock);
  }, []);

  const baseURL = 'http://localhost:3000/lembretes';

  // GET Lembretes usa quando tiver o backend
  /*useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(baseURL);
        setReminders(response.data);
        setFiltered(response.data);
      } catch (_) {
        setNotification({
          type: 'error',
          message: 'Erro ao carregar lembretes!',
        });
      }
    };
    fetchLembretes();
  }, []);*/

  const handleAddReminder = async (reminderResponse) => {
    try {
      const response = await axios.post(baseURL, reminderResponse);
      setReminders((prev) => [...prev, response.data]);
      setFiltered((prev) => [...prev, response.data]);
      setNotification({
        type: 'success',
        message: 'Lembrete adicionado com sucesso!',
      });
      setIsModalOpen(false);
    } catch (_) {
      setNotification({
        type: 'error',
        message: 'Erro ao salvar lembrete!',
      });
    }
  };

  const handleFilter = (text) => {
    if (!text.trim()) {
      setFiltered(reminders);
      return;
    }
    setFiltered(
      reminders.filter((l) =>
        l.descricao.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col rounded-lg bg-white p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-gray-800">
          Gerenciar Lembretes
        </h2>
        <button
          className="flex items-center gap-2 rounded-lg bg-[#2979FF] px-4 py-2 text-white shadow-[#2161E5]/50 shadow-lg transition hover:bg-[#2161E5]"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          <Plus className="h-5 w-5" /> Adicionar Lembrete
        </button>
      </div>

      <ReminderFilter onSearch={handleFilter} />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r) => (
          <ReminderCard key={r.id} reminder={r} />
        ))}
      </div>

      {isModalOpen && (
        <AddModalReminder
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddReminder}
        />
      )}

      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />
    </div>
  );
}
