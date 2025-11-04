import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  countriesOptions,
  countryCurrencyMap,
} from '../../data/countries-currency-map';

export default function CountrySelect() {
  const { control, setValue } = useFormContext();

  const handleCountryChange = (countryCode) => {
    const country = countryCurrencyMap[countryCode];
    if (country) {
      setValue('country', countryCode, { shouldDirty: true });
      setValue('currency', country, { shouldDirty: true });
    } else {
      setValue('country', '', { shouldDirty: true });
      setValue('currency', null, { shouldDirty: true });
    }
  };

  return (
    <div className="space-y-2">
      <Controller
        control={control}
        name="country"
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="flex w-full flex-col space-y-2">
              <label
                className="font-medium text-gray-700 text-sm"
                htmlFor="country"
              >
                País
              </label>

              <Listbox
                id="country"
                onBlur={field.onBlur}
                onChange={(value) => {
                  field.onChange(value);
                  handleCountryChange(value);
                }}
                value={field.value || ''}
              >
                <div className="relative">
                  {/* Botão principal */}
                  <ListboxButton
                    className={`flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-3 text-left focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                      error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300'
                    }`}
                  >
                    <span>
                      {countriesOptions.find(
                        (country) => country.code === field.value
                      )?.label || 'Selecione um país'}
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </ListboxButton>

                  {/* Lista de opções */}
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none">
                    {countriesOptions.map((country) => (
                      <ListboxOption
                        className="group cursor-pointer select-none p-3 text-gray-900 data-[headlessui-state=active]:bg-blue-100 data-[headlessui-state=active]:text-blue-900"
                        key={country.code}
                        value={country.code}
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span>{country.label}</span>
                            {selected && (
                              <Check className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
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
