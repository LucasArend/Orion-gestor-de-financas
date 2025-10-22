import { Controller, useFormContext } from 'react-hook-form';

export function CurrencyInput({ name, label, icon: Icone }) {
  const percent = 100;
  const { control, watch } = useFormContext();
  const currency = watch('currency');

  const formatCurrency = (value) => {
    if (!currency) {
      return value;
    }
    const number = Number(value.replace(/\D/g, '')) / percent;

    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
    }).format(number);
  };

  const parseCurrency = (value) => {
    return value.replace(/\D/g, '');
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700 text-sm" htmlFor={name}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="relative flex w-full flex-col">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                {Icone && (
                  <Icone aria-hidden="true" className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <input
                {...field}
                className={`rounded-lg border p-3 pr-10 pl-10 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
                  error
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-300'
                }`}
                disabled={!currency}
                id={name}
                onChange={(e) => field.onChange(parseCurrency(e.target.value))}
                value={formatCurrency(field.value || '0')}
              />
            </div>
            <p
              className={`mt-1 text-sm ${error ? 'text-red-500' : 'invisible'}`}
            >
              {error ? error.message : ' '}
            </p>
          </>
        )}
      />
    </div>
  );
}
