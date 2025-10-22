import { yupResolver } from '@hookform/resolvers/yup';
import { HeartHandshake, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { financialSchema } from '../../utils/validation-schema';
import CountrySelect from '../Input/country-select';
import { CurrencyDisplay } from '../Input/currency-display';
import { CurrencyInput } from '../Input/currency-input';

export default function FinancialInfoTab({ setHasUnsavedChanges }) {
  const methods = useForm({
    resolver: yupResolver(financialSchema),
    defaultValues: {
      country: '',
      currency: null,
      emergencyFund: '',
      totalIncome: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  useEffect(() => {
    setHasUnsavedChanges(isDirty && isValid);
  }, [isDirty, isValid, setHasUnsavedChanges]);

  return (
    <FormProvider {...methods}>
      <form className="space-y-6">
        <div className="space-y-1">
          <div className="relative mb-2 space-y-1 pl-4 font-semibold text-gray-800 text-lg">
            <div className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-indigo-500" />
            <h3 className="font-semibold text-gray-800 text-lg">
              Preferências Gerais
            </h3>
          </div>
          <p className="text-gray-500 text-sm">
            Defina a moeda de sua escolha, país, reserva de emergência e renda
            total.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <CountrySelect />
          <CurrencyDisplay />
          <CurrencyInput
            icon={HeartHandshake}
            label="Reserva de Emergência"
            name="emergencyFund"
          />
          <CurrencyInput
            icon={TrendingUp}
            label="Renda Total"
            name="totalIncome"
          />
        </div>
      </form>
    </FormProvider>
  );
}
