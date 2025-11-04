import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';

export default function SortDropdown({
  value,
  onChange,
  options,
  placeholder = 'Selecione',
  disabled = false,
  id,
}) {
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <Listbox disabled={disabled} onChange={onChange} value={value}>
      <div className="relative">
        <ListboxButton
          className={`flex w-40 items-center justify-between rounded-lg border p-2 text-left ${
            disabled
              ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
              : 'border-gray-300 bg-white focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-200'
          }`}
          id={id}
        >
          <span>{selectedLabel}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </ListboxButton>

        {!disabled && options.length > 0 && (
          <ListboxOptions className="absolute z-10 mt-1 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {options.map((opt) => (
              <ListboxOption
                className="cursor-pointer select-none p-2 text-gray-900 hover:bg-blue-100"
                key={opt.value}
                value={opt.value}
              >
                {({ selected }) => (
                  <div className="flex justify-between">
                    <span>{opt.label}</span>
                    {selected && <Check className="h-4 w-4 text-blue-600" />}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        )}
      </div>
    </Listbox>
  );
}
