import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { goalSchema } from '../../utils/validation-schema';

function calculateProjectedDate(targetValue, monthlyContribution, accumulated) {
  if (!(targetValue && monthlyContribution)) {
    return '';
  }
  const remaining = targetValue - (accumulated || 0);
  const months = remaining / monthlyContribution;
  const now = new Date();
  now.setMonth(now.getMonth() + Math.ceil(months));
  return now.toISOString().split('T')[0];
}

export default function AddGoalModal({ onClose, onSuccess, onError }) {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(goalSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      description: '',
      targetValue: '',
      accumulated: '',
      monthlyContribution: '',
      projectedDate: '',
      deadline: '',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const targetValue = watch('targetValue');
  const accumulated = watch('accumulated');
  const monthlyContribution = watch('monthlyContribution');

  const forecastDate = calculateProjectedDate(
    targetValue,
    monthlyContribution,
    accumulated
  );

  const handleSave = async () => {

    setIsSubmitting(true);

    // Definir o parametro 'data' depois
    /*const payload = {
      objetivo: data.description,
      meta: Number(data.targetValue),
      poupado: Number(data.accumulated),
      contribuicao: Number(data.monthlyContribution),
      previsao: forecastDate,
      dataAlmejada: data.deadline,
    };*/

    try {
      //const URL = 'https://seu-backend.com/api/metas';
      //await axios.post(URL, payload);
      const timer = 1000
      await new Promise((resolve) => setTimeout(resolve, timer));
      onSuccess();
      reset();
      onClose();
    } catch (_) {
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleCancel() {
    reset();
    onClose();
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl rounded-xl bg-white p-8 shadow-xl"
        exit={{ scale: 0.9, opacity: 0 }}
        initial={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-700"
          onClick={handleCancel}
          type="reset"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="mb-6 font-semibold text-gray-800 text-xl">
          Adicionar Nova Meta
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(handleSave)}>
          {/* Objetivo */}
          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="description"
            >
              Descrição
            </label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <input
                  {...field}
                  className={`w-full rounded-lg border px-3 py-2 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
                    errors.description
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                      : 'border-gray-300'
                  }`}
                  id="description"
                  placeholder="Ex: Viagem, Carro novo"
                  type="text"
                />
              )}
            />
            <p
              className={`mt-1 text-sm ${errors.description ? 'text-red-500' : 'invisible'}`}
            >
              {errors.description ? errors.description?.message : ' '}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Meta */}
            <div>
              <label
                className="mb-1 block font-medium text-gray-700 text-sm"
                htmlFor="targetValue"
              >
                Valor Alvo (R$)
              </label>
              <Controller
                control={control}
                name="targetValue"
                render={({ field }) => (
                  <input
                    {...field}
                    className={`w-full rounded-lg border px-3 py-2 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
                      errors.targetValue
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300'
                    }`}
                    id="targetValue"
                    min="0"
                    placeholder="Ex: 5000"
                    step="0.01"
                    type="number"
                  />
                )}
              />
              <p
                className={`mt-1 text-sm ${errors.targetValue ? 'text-red-500' : 'invisible'}`}
              >
                {errors.targetValue ? errors.targetValue?.message : ' '}
              </p>
            </div>

            {/* Poupado */}
            <div>
              <label
                className="mb-1 block font-medium text-gray-700 text-sm"
                htmlFor="accumulated"
              >
                Acumulado (R$)
              </label>
              <Controller
                control={control}
                name="accumulated"
                render={({ field }) => (
                  <input
                    {...field}
                    className={`w-full rounded-lg border px-3 py-2 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-200 ${
                      errors.accumulated
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300'
                    }`}
                    id="accumulated"
                    min="0"
                    placeholder="Ex: 50,33"
                    step="0.01"
                    type="number"
                  />
                )}
              />
              <p
                className={`mt-1 text-sm ${errors.accumulated ? 'text-red-500' : 'invisible'}`}
              >
                {errors.accumulated ? errors.accumulated?.message : ' '}
              </p>
            </div>

            {/* Contribuição */}
            <div>
              <label
                className="mb-1 block font-medium text-gray-700 text-sm"
                htmlFor="monthlyContribution"
              >
                Aporte Mensal (R$)
              </label>
              <Controller
                control={control}
                name="monthlyContribution"
                render={({ field }) => (
                  <input
                    {...field}
                    className={`w-full rounded-lg border px-3 py-2 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-200 ${
                      errors.monthlyContribution
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300'
                    }`}
                    id="monthlyContribution"
                    min="0"
                    placeholder="Ex: 200"
                    step="0.01"
                    type="number"
                  />
                )}
              />
              <p
                className={`mt-1 text-sm ${errors.monthlyContribution ? 'text-red-500' : 'invisible'}`}
              >
                {errors.monthlyContribution
                  ? errors.monthlyContribution?.message
                  : ' '}
              </p>
            </div>

            {/* Previsão */}
            <div>
              <label
                className="mb-1 block font-medium text-gray-700 text-sm"
                htmlFor="projectedDate"
              >
                Data Prevista
              </label>
              <Controller
                control={control}
                name="projectedDate"
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500"
                    disabled
                    id="projectedDate"
                    type="date"
                    value={forecastDate || ''}
                  />
                )}
              />
            </div>

            {/* Data Almejada */}
            <div>
              <label
                className="mb-1 block font-medium text-gray-700 text-sm"
                htmlFor="deadline"
              >
                Prazo Final
              </label>
              <Controller
                control={control}
                name="deadline"
                render={({ field }) => (
                  <input
                    {...field}
                    className={`w-full rounded-lg border px-3 py-2 focus:border-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-200 ${
                      errors.deadline
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300'
                    }`}
                    id="deadline"
                    type="date"
                  />
                )}
              />
              <p
                className={`mt-1 text-sm ${errors.deadline ? 'text-red-500' : 'invisible'}`}
              >
                {errors.deadline ? errors.deadline?.message : ' '}
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              className="rounded-lg bg-[#2979FF] px-8 py-2 text-lg text-white shadow-[#2161E5]/50 shadow-lg transition-colors hover:bg-[#2161E5]"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
