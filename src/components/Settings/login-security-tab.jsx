import { yupResolver } from '@hookform/resolvers/yup';
import { Asterisk, KeyRound, Lock, LockKeyhole } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { passwordSchema } from '../../utils/validation-schema';
import PasswordInput from '../Input/password-input';

export default function LoginSecurityTab({ setHasUnsavedChanges }) {
  const methods = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    formState: { isDirty, isValid, errors },
  } = methods;

  useEffect(() => {
    setHasUnsavedChanges(isDirty && isValid);
  }, [isDirty, isValid, setHasUnsavedChanges]);

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="space-y-1">
          <div className="relative mb-2 space-y-1 pl-4 font-semibold text-gray-800 text-lg">
            <div className="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-indigo-500" />
            <h3 className="font-semibold text-gray-800 text-lg">
              Alterar Senha
            </h3>
          </div>
          <p className="text-gray-500 text-sm">
            Recomendamos que altere sua senha regularmente para evitar acessos
            não autorizados.
          </p>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
          <PasswordInput
            icon={LockKeyhole}
            label="Nova Senha"
            name="newPassword"
            type="password"
          />
          <PasswordInput
            icon={KeyRound}
            label="Confirme a Nova Senha"
            name="confirmNewPassword"
            type="password"
          />
          <PasswordInput
            icon={Lock}
            label="Senha Atual"
            name="password"
            type="password"
          />
        </div>

        {Object.keys(errors).length > 0 && (
          <p className="flex justify-end text-red-400 text-sm">
            <Asterisk className="h-3 w-3" />
            Corrija os campos destacados antes de salvar
          </p>
        )}
      </div>
    </FormProvider>
  );
}
