import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTransactionsMe } from '../../hooks/use-api';

function formatReminderDate(expirationDate, status) {
  const now = new Date();
  const dueDate = new Date(expirationDate);
  const ms = 1000;

  const diffMs = dueDate - now;
  const diffHours = diffMs / (ms * 60 * 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMs > 0) {
    if (diffHours < 24) {
      const hoursLeft = Math.round(diffHours);
      return `vence em ${hoursLeft}h`;
    }
    return `vence em ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
  }
  const pastHours = Math.abs(diffHours);
  const pastDays = Math.floor(pastHours / 24);

  if (status.toUpperCase() === 'CONCLUIDO') {
    return pastDays < 1
      ? `concluído há ${Math.round(pastHours)}h`
      : `concluído há ${pastDays} ${pastDays === 1 ? 'dia' : 'dias'}`;
  }

  return pastDays < 1
    ? `atrasado há ${Math.round(pastHours)}h`
    : `atrasado há ${pastDays} ${pastDays === 1 ? 'dia' : 'dias'}`;
}

export default function RemindersList() {
  const { data: transactions, isLoading } = useTransactionsMe();
  const navigate = useNavigate();

  const reminders = (transactions || [])
    .filter((t) => t.tipoTransacao?.nome === 'despesa')
    .map((t) => ({
      id: t.id,
      text: t.descricao,
      date: formatReminderDate(t.dataVencimento, t.status),
    }));

  const maxItems = 5;
  const shouldShowButton = reminders.length > maxItems;
  const remindersToShow = shouldShowButton
    ? reminders.slice(0, maxItems)
    : reminders;

  if (isLoading) {
    return (
      <p className="mt-4 text-center text-gray-500">
        Carregando seus lembretes...
      </p>
    );
  }

  if (!transactions.length) {
    return (
      <p className="mt-4 text-center text-gray-500">
        Nenhum lembrete disponível no momento.
      </p>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-6 text-gray-800 shadow-sm">
      {/* Título da seção de lembretes e botão de add */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-2xl text-gray-800">Lembretes</h3>
      </div>

      {/* Lista de itens */}
      <ul className="flex-1 overflow-y-auto px-4">
        {remindersToShow.map((reminder) => (
          <li
            className="border-gray-200 border-b py-1 last:border-b-0"
            key={reminder.id}
          >
            <div className="flex items-center justify-between space-x-2 rounded-lg py-2 align-middle hover:bg-zinc-100">
              <div className="flex space-x-3">
                <AlertCircle className="h-7 w-7 flex-shrink-0 text-yellow-500" />
                <span className="overflow-hidden text-ellipsis text-gray-700">
                  {reminder.text}
                </span>
              </div>
              <span className="flex-shrink-0 text-gray-500 text-xs">
                {reminder.date.toUpperCase()}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Botão de "Mostrar mais" na base, centralizado */}
      {shouldShowButton && (
        <div className="flex flex-col items-center pt-2 pr-3 pl-3 text-center">
          <button
            className="flex w-full items-center justify-center rounded-lg bg-[#2979FF] py-2 font-semibold text-sm text-white shadow-[#2161E5]/50 shadow-lg transition-colors hover:bg-[#2161E5]"
            onClick={() => navigate('/transacao')}
            type="button"
          >
            Mostrar mais
          </button>
        </div>
      )}
    </div>
  );
}
