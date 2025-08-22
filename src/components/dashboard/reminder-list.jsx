import { AlertCircle } from 'lucide-react';

export default function RemindersList({ reminders }) {
  const maxItems = 5;
  const shouldShowButton = reminders.length > maxItems;
  const remindersToShow = shouldShowButton
    ? reminders.slice(0, maxItems)
    : reminders;

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-6 text-gray-800 shadow-sm">
      {/* Título da seção de lembretes */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-xl">Lembretes</h3>
      </div>

      {/* Lista de itens */}
      <ul className="flex-1 overflow-y-auto">
        {remindersToShow.map((reminder) => (
          <li
            className="flex items-start justify-between space-x-2 border-gray-100 border-b py-3 last:border-b-0"
            key={reminder.id}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-500" />
              <span className="overflow-hidden text-ellipsis text-gray-700">
                {reminder.text}
              </span>
            </div>
            <span className="flex-shrink-0 text-gray-400 text-sm">
              {reminder.date}
            </span>
          </li>
        ))}
      </ul>

      {/* Botão de "Mostrar mais" na base, centralizado */}
      {shouldShowButton && (
        <div className="flex flex-col items-center pt-2 pr-10 pl-10 text-center">
          <button
            className="flex w-full items-center justify-center rounded-lg bg-gray-100 py-2 font-semibold text-gray-800 text-sm transition-colors hover:bg-gray-200"
            type="button"
          >
            Mostrar mais
          </button>
        </div>
      )}
    </div>
  );
}
