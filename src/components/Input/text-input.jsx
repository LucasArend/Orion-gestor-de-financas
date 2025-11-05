import { AlertCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export default function TextInput({
  label,
  name,
  type = 'text',
  placeholder = '',
  icon: Icon,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 text-sm" htmlFor={name}>
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          {Icon && (
            <Icon aria-hidden="true" className="h-5 w-5 text-gray-500" />
          )}
        </div>

        <input
          id={name}
          {...register(name)}
          className={`w-full rounded-lg border p-3 pr-10 pl-10 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300'
          }`}
          placeholder={placeholder}
          type={type}
        />

        {error && (
          <AlertCircle className="absolute top-3 right-3 h-6 w-6 text-red-500" />
        )}
      </div>
      <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'invisible'}`}>
        {error ? error.message : ' '}
      </p>
    </div>
  );
}
