import { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useCurrency } from '../../context/currency-provider';

export function CurrencyInput({ name, label, icon: Icone }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { currency } = useCurrency();
  const [display, setDisplay] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const watched = useWatch({ control, name });

  const formatCurrency = (num) => {
    if (num === null || num === undefined || !currency?.code) {
      return '';
    }
    if (Number.isNaN(Number(num))) {
      return '';
    }
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(num));
  };

  const parseNumberFromText = (text) => {
    if (!text) {
      return null;
    }

    let t = String(text).trim();
    t = t.replace(/[^\d.,]/g, '');
    if (t.includes('.') && t.includes(',')) {
      t = t.replace(/\./g, '').replace(',', '.');
    } else if (t.includes(',')) {
      t = t.replace(',', '.');
    }
    const parts = t.split('.');
    if (parts.length > 2) {
      t =
        parts.slice(0, parts.length - 1).join('') +
        '.' +
        parts[parts.length - 1];
    }

    const n = Number(t);
    return Number.isNaN(n) ? null : n;
  };

  useEffect(() => {
    if (isFocused) {
      return;
    }

    if (watched === null || watched === undefined || watched === '') {
      setDisplay('');
      return;
    }

    const asNumber =
      typeof watched === 'number'
        ? watched
        : parseNumberFromText(String(watched));
    if (asNumber != null) {
      setDisplay(formatCurrency(asNumber));
    } else {
      setDisplay('');
    }
  }, [watched, currency]);

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
                errors[name]
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300'
              }`}
              disabled={!currency}
              id={name}
              inputMode="decimal"
              onBlur={() => {
                setIsFocused(false);
                const current = field.value;
                if (
                  current !== null &&
                  current !== undefined &&
                  current !== ''
                ) {
                  const num =
                    typeof current === 'number'
                      ? current
                      : parseNumberFromText(String(current));
                  if (num != null) {
                    setDisplay(formatCurrency(num));
                    return;
                  }
                }
                setDisplay('');
              }}
              onChange={(e) => {
                const raw = e.target.value;
                setDisplay(raw);
                const parsed = parseNumberFromText(raw);
                field.onChange(parsed);
              }}
              onFocus={() => {
                setIsFocused(true);
                if (
                  field.value !== null &&
                  field.value !== undefined &&
                  field.value !== ''
                ) {
                  if (typeof field.value === 'number') {
                    setDisplay(String(field.value).replace('.', ','));
                  } else {
                    const parsed = parseNumberFromText(String(field.value));
                    setDisplay(
                      parsed != null ? String(parsed).replace('.', ',') : ''
                    );
                  }
                } else {
                  setDisplay('');
                }
              }}
              value={display}
            />
          </div>
        )}
      />

      <p
        className={`mt-1 text-sm ${errors[name] ? 'text-red-500' : 'invisible'}`}
      >
        {errors[name] ? errors[name].message : ' '}
      </p>
    </div>
  );
}
