import { useFormContext } from 'react-hook-form';
import { countryCurrencyMap } from '../../data/countries-currency-map';

export function CurrencyDisplay() {
  const { watch } = useFormContext();
  const country = watch('country');
  const currency = countryCurrencyMap[country];

  return (
    <div className="space-y-2">
      <label
        className="block font-medium text-gray-700 text-sm"
        htmlFor="currency"
      >
        Moeda
      </label>

      <div className="flex items-center rounded-lg border border-gray-300 bg-gray-50 py-3">
        <input
          className="block w-[80px] border-none px-3 text-center text-gray-600"
          disabled
          type="text"
          value={currency ? currency.code : '--'}
        />
        <span className="h-6 w-px bg-gray-300" />
        <input
          className="block w-[80px] border-none px-3 text-center text-gray-600"
          disabled
          type="text"
          value={currency ? currency.symbol : '--'}
        />
        <span className="h-6 w-px bg-gray-300" />
        <input
          className="block w-full border-none px-3 text-gray-600"
          disabled
          placeholder="Selecione um país"
          type="text"
          value={currency ? currency.name : ''}
        />
      </div>
    </div>
  );
}
