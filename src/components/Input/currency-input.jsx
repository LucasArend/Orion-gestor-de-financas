import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { localeToCurrency } from '../../data/countries-currency-map';

export function CurrencyInput({ name, label, icon: Icone }) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const percent = 100;
  const locale =
    typeof navigator !== 'undefined' ? navigator.language : 'pt-BR';
  const defaultCurrency = localeToCurrency[locale] || localeToCurrency['pt-BR'];
  const formCurrency = watch('currency');

  const hasRequiredProps = formCurrency?.code && formCurrency?.locale;

  const currency = hasRequiredProps ? formCurrency : defaultCurrency;

  const formatCurrency = (value) => {
    if (!currency?.code) {
      return value ?? '';
    }

    if (value === null || value === undefined) {
      return '';
    }

    let number;

    if (typeof value === 'number') {
      number = value;
    } else {
      const numericValue = String(value).replace(/\D/g, '');
      number = Number(numericValue) / percent;
    }

    if (Number.isNaN(number)) {
      return '';
    }

    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
    }).format(number);
  };

  const parseCurrency = (value) => {
    if (!value) {
      return '';
    }
    const onlyNumbers = value.replace(/[^\d,]/g, '');
    const normalized = onlyNumbers.replace(',', '.');
    return normalized;
  };

  useEffect(() => {
    const val = watch(name);
    if (val) {
      setValue(name, parseCurrency(formatCurrency(val)));
    }
  }, [currency]);

  const error = errors[name];

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700 text-sm" htmlFor={name}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
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
        )}
      />
      <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'invisible'}`}>
        {error ? error.message : ' '}
      </p>
    </div>
  );
}
