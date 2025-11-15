import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { goalSchema } from '../../utils/validation-schema';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function calculateProjectedDate(targetValue, monthlyContribution, accumulated) {
  const numTarget = Number(targetValue) || 0;
  const numContribution = Number(monthlyContribution) || 0;
  const numAccumulated = Number(accumulated) || 0;

  if (numContribution <= 0) {
    return '';
  }

  const remaining = numTarget - numAccumulated;
  
  if (remaining <= 0) {
    return new Date().toISOString().split('T')[0];
  }

  const months = remaining / numContribution;
  const now = new Date();
  now.setMonth(now.getMonth() + Math.ceil(months));

  return now.toISOString().split('T')[0];
}

export default function AddGoalModal({ onClose, onSuccess, onError, onGoalAdded, initialData, onEditSubmit }) {
  const { token } = useAuth();

  const isEditing = !!initialData;

  const {
    control,
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(goalSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      description: initialData?.objective || '',
      targetValue: initialData?.goal || '',
      accumulated: initialData?.saved || '',
      monthlyContribution: initialData?.contribution || '',
      projectedDate: '',
      deadline: initialData?.goalDate?.split('T')[0] || '',
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

  useEffect(() => {
    if (isEditing && initialData) {
        reset({
            description: initialData.objective,
            targetValue: initialData.goal,
            accumulated: initialData.saved,
            monthlyContribution: initialData.contribution,
            deadline: initialData.goalDate?.split('T')[0] || '', 
        }, { keepDefaultValues: false });
    }
  }, [isEditing, initialData, reset]);

  useEffect(() => {
    if(forecastDate) {
      setValue('projectedDate', forecastDate, { shouldValidate: true })
    } else {
      setValue('projectedDate', '')
    }
  }, [forecastDate, setValue])

  const handleSave = async (data) => {
    setIsSubmitting(true);

    const payload = {
      objective: data.description,
      goal: Number(data.targetValue),
      saved: Number(data.accumulated),
      contribution: Number(data.monthlyContribution),
      expectedData: forecastDate,
      goalDate: data.deadline,
    };

    try {
      const timer = 500
      await new Promise((resolve) => setTimeout(resolve, timer))

      if (isEditing) {
        await onEditSubmit(initialData.id, payload)
        onSuccess('edited')
      } else {
        const URL = 'http://localhost:8080/goals';
        await axios.post(URL, payload, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        onSuccess('added')
      }

      if (onGoalAdded) {
        onGoalAdded(data)
      }
      reset();
      onClose();
    } catch (error) {
      console.log("Erro ao salvar meta: ", error);
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
          {isEditing ? 'Editar Meta' : 'Adicionar Nova Meta'}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(handleSave)}>
          {/* Descrição */}
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
                  value={field.value || ''}
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
              className={`mt-1 text-sm ${
                errors.description ? 'text-red-500' : 'invisible'
              }`}
            >
              {errors.description ? errors.description?.message : ' '}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Valor Alvo */}
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
                    value={field.value || ''}
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
                className={`mt-1 text-sm ${
                  errors.targetValue ? 'text-red-500' : 'invisible'
                }`}
              >
                {errors.targetValue ? errors.targetValue?.message : ' '}
              </p>
            </div>

            {/* Acumulado */}
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
                    value={field.value || ''}
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
                className={`mt-1 text-sm ${
                  errors.accumulated ? 'text-red-500' : 'invisible'
                }`}
              >
                {errors.accumulated ? errors.accumulated?.message : ' '}
              </p>
            </div>

            {/* Aporte Mensal */}
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
                    value={field.value || ''}
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
                className={`mt-1 text-sm ${
                  errors.monthlyContribution ? 'text-red-500' : 'invisible'
                }`}
              >
                {errors.monthlyContribution
                  ? errors.monthlyContribution?.message
                  : ' '}
              </p>
            </div>

            {/* Data Prevista (Apenas leitura) */}
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
                    readOnly
                    id="projectedDate"
                    type="date"
                    value={forecastDate || ''}
                  />
                )}
              />
            </div>

            {/* Prazo Final */}
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
                    value={field.value || ''}
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
                className={`mt-1 text-sm ${
                  errors.deadline ? 'text-red-500' : 'invisible'
                }`}
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