import { useFormContext } from 'react-hook-form';

export default function TextAreaInput({ label, name, maxLength = 300 }) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const value = watch(name) || '';
  const error = errors[name];

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700 text-sm" htmlFor={name}>
        {label}
      </label>
      <textarea
        {...register(name, { maxLength })}
        className={`w-full resize-none rounded-lg border p-3 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300'
        }`}
        id={name}
        placeholder="Fale um pouco sobre você..."
        rows={3}
      />

      <div className="flex justify-between pt-1 text-gray-500 text-xs">
        <span className="text-red-500">{error?.message}</span>
        <span>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
