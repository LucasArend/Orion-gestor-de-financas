import { AlertCircle, Plus } from 'lucide-react';

export default function RemindersList({ reminders }) {
  const maxItems = 5;
  const shouldShowButton = reminders.length > maxItems;
  const remindersToShow = shouldShowButton
    ? reminders.slice(0, maxItems)
    : reminders;

  return (
    <div className="flex h-full flex-col rounded-lg bg-white p-6 text-gray-800 shadow-sm">
      {/* Título da seção de lembretes e botão de add */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 text-xl">Lembretes</h3>
        <button
          className="flex items-center space-x-2 rounded-lg bg-zinc-200 px-3 py-2 text-sm text-zinc-800 shadow-lg shadow-zinc-400/50 transition-colors hover:bg-zinc-300"
          type="button"
        >
          <Plus className="h-4 w-4" />
          <span>Adicionar</span>
        </button>
      </div>

      {/* Lista de itens */}
      <ul className="flex-1 overflow-y-auto">
        {remindersToShow.map((reminder) => (
          <li
            className="border-gray-100 border-b py-1 last:border-b-0"
            key={reminder.id}
          >
            <div className="flex items-start justify-between space-x-2 rounded-lg border-gray-100 p-2 py-2 last:border-b-0 hover:bg-zinc-100">
              <div className="flex items-start space-x-3">
                <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-500" />
                <span className="overflow-hidden text-ellipsis text-gray-700">
                  {reminder.text}
                </span>
              </div>
              <span className="flex-shrink-0 text-gray-400 text-sm">
                {reminder.date}
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
            type="button"
          >
            Mostrar mais
          </button>
        </div>
      )}
    </div>
  );
}
