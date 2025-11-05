import { AlarmClock } from 'lucide-react';

export default function ReminderCard({ reminder }) {
  const reminderDate = new Date(reminder.data);
  const now = new Date();
  const isCompleted = reminderDate < now;

  const formatDate = (d) =>
    d
      .toLocaleString('pt-BR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(/\. /g, ' ')
      .replace(/\./g, '');

  return (
    <div
      className={`flex flex-col justify-between rounded-lg border p-5 shadow-md transition ${
        isCompleted
          ? 'border-gray-300 bg-gray-100 opacity-60'
          : 'border-gray-300 bg-white hover:shadow-lg'
      }`}
    >
      <div className="flex items-center justify-between">
        <AlarmClock
          className={`h-6 w-6 ${
            isCompleted ? 'text-red-500' : 'text-blue-500'
          }`}
        />
        <span className="text-gray-500 text-sm">
          {isCompleted
            ? `Concluído: ${formatDate(reminderDate)}`
            : formatDate(reminderDate)}
        </span>
      </div>

      <div className="mt-4">
        <h3
          className={`font-semibold text-gray-800 text-lg ${
            isCompleted ? 'line-through' : 'no-underline'
          }`}
        >
          {reminder.descricao}
        </h3>
      </div>
    </div>
  );
}
