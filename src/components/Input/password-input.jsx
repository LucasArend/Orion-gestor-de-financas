import { AlertCircle, Eye, EyeClosed } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function PasswordInput({
  label,
  name,
  placeholder = '',
  icon: Icone,
}) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);
  const timer = 5000;

  const handleToggle = () => {
    const cursorPosition = inputRef.current?.selectionStart || 0;

    setShowPassword((prev) => {
      const nextState = !prev;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (nextState) {
        timerRef.current = setTimeout(() => {
          setShowPassword(false);
        }, timer);
      }

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
          inputRef.current.focus();
        }
      }, 0);

      return nextState;
    });
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

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
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                {Icone && (
                  <Icone aria-hidden="true" className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <input
                id={name}
                {...field}
                className={`w-full rounded-lg border p-3 pr-10 pl-10 focus:border-indigo-600 focus:outline-hidden focus:ring-3 focus:ring-blue-200 ${
                  error
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-300'
                }`}
                placeholder={placeholder}
                ref={(el) => {
                  field.ref(el);
                  inputRef.current = el;
                }}
                type={showPassword ? 'text' : 'password'}
              />

              <button
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-600 hover:text-gray-800"
                onClick={handleToggle}
                onMouseDown={(e) => e.preventDefault()}
                type="button"
              >
                {showPassword ? (
                  <EyeClosed className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

              {error && (
                <div className="absolute inset-y-0 right-10 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
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
