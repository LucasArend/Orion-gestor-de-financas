import { AlertCircle } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

export default function MaskedInput({
  label,
  name,
  mask,
  placeholder = '',
  icon: Icone,
}) {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-900 text-sm" htmlFor={name}>
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {Icone && (
                <Icone aria-hidden="true" className="h-5 w-5 text-gray-500" />
              )}
            </div>
            <IMaskInput
              className={`w-full rounded-lg border p-3 pr-4 pl-10 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              id={name}
              mask={mask}
              onAccept={(val) => {
                onChange(val);
              }}
              placeholder={placeholder}
              unmask={true}
              value={value ?? ''}
            />
            {error && (
              <AlertCircle className="absolute top-3 right-3 h-6 w-6 text-red-500" />
            )}
          </div>
        )}
      />

      <p className="h-4 text-red-500 text-sm">
        {control._formState.errors[name]?.message}
      </p>
    </div>
  );
}
