import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { reminderSchema } from '../../utils/validation-schema';

export default function AddModalReminder({ onClose, onSave }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reminderSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      descriptionReminder: '',
      date: '',
      time: '',
    },
  });

  const handleSave = (data) => {
    const reminderResponse = {
      descricao: data.descricao,
      data: `${data.data}T${data.hora}`,
    };
    onSave(reminderResponse);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 text-xl">Novo Lembrete</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSave)}>
          <div>
            <label
              className="mb-1 block text-gray-600 text-sm"
              htmlFor="descriptionReminder"
            >
              Descrição
            </label>
            <Controller
              control={control}
              name="descriptionReminder"
              render={({ field }) => (
                <input
                  id="descriptionReminder"
                  type="text"
                  {...field}
                  className={`w-full rounded-lg border px-3 py-2 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
                    errors.descriptionReminder
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300'
                  }`}
                />
              )}
            />
            <p
              className={`mt-1 text-sm ${errors.descriptionReminder ? 'text-red-500' : 'invisible'}`}
            >
              {errors.descriptionReminder
                ? errors.descriptionReminder?.message
                : ' '}
            </p>
          </div>

          <div>
            <label
              className="mb-1 block text-gray-600 text-sm"
              htmlFor="dateReminder"
            >
              Data
            </label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <input
                  {...field}
                  className={`w-full rounded-lg border px-3 py-2 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
                    errors.date
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300'
                  }`}
                  id="dateReminder"
                  type="date"
                />
              )}
            />
            <p
              className={`mt-1 text-sm ${errors.date ? 'text-red-500' : 'invisible'}`}
            >
              {errors.date ? errors.date?.message : ' '}
            </p>
          </div>

          <div>
            <label
              className="mb-1 block text-gray-600 text-sm"
              htmlFor="timeReminder"
            >
              Hora
            </label>
            <Controller
              control={control}
              name="time"
              render={({ field }) => (
                <input
                  {...field}
                  className={`w-full rounded-lg border px-3 py-2 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
                    errors.time
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300'
                  }`}
                  type="time"
                />
              )}
            />
            <p
              className={`mt-1 text-sm ${errors.time ? 'text-red-500' : 'invisible'}`}
            >
              {errors.time ? errors.time?.message : ' '}
            </p>
          </div>

          <button
            className="mt-4 w-full rounded-lg bg-[#2979FF] px-8 py-2 text-lg text-white shadow-[#2161E5]/50 shadow-lg transition-colors hover:bg-[#2161E5]"
            type="submit"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
