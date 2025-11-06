import { yupResolver } from '@hookform/resolvers/yup';
import { Asterisk, KeyRound, Lock, LockKeyhole } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { passwordSchema } from '../../utils/validation-schema';
import PasswordInput from '../Input/password-input';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginSecurityTab({
  setHasUnsavedChanges,
  setFormResetCallback,
  userData
}) {
  const { token, logout } = useAuth(); 
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const methods = useForm({
    defaultValues: userData,
    resolver: yupResolver(passwordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    reset,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = methods;

  useEffect(() => {
    const shouldEnableSave = isDirty && isValid;
    setHasUnsavedChanges(shouldEnableSave);
  }, [isDirty, isValid, setHasUnsavedChanges]);

  useEffect(() => {
    const resetToOriginal = () => {
      reset(
        {
          password: '',
          newPassword: '',
          confirmNewPassword: '',
        },
        { keepDirty: false }
      );
      setHasUnsavedChanges(false);
    };
    setFormResetCallback(() => resetToOriginal);
  }, [setFormResetCallback, reset, setHasUnsavedChanges]);

  // Função para chamar a API de troca de senha
  const onSubmit = async (data) => {
    const { password, newPassword } = data;
    setError('');
    setSuccessMessage('');
    setLoadingSubmit(true);

    try {
      const response = await fetch('http://localhost:8080/users/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: password, newPassword }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message || 'Senha alterada com sucesso!');
        setError('');

        try {
          await logout(); 
        } catch (e) {
        }


        setTimeout(() => {
          navigate('/');
        }, 700);
      } else {
        let errMsg = 'Erro ao alterar a senha';
        try {
          const result = await response.json();
          errMsg = result.error || result.message || errMsg;
        } catch (e) {
        }
        setError(errMsg);
        setSuccessMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao alterar a senha. Tente novamente.');
      setSuccessMessage('');
    } finally {
      setLoadingSubmit(false);
    }
  };

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


        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
          <PasswordInput
            icon={LockKeyhole}
            label="Nova Senha"
            name="newPassword"
            placeholder="Digite uma nova senha"
            type="password"
          />
          <PasswordInput
            icon={KeyRound}
            label="Confirme a Nova Senha"
            name="confirmNewPassword"
            placeholder="Confirme a nova senha"
            type="password"
          />
          <PasswordInput
            icon={Lock}
            label="Senha Atual"
            name="password"
            placeholder="Digite sua senha atual"
            type="password"
          />
        </div>

        {Object.keys(errors).length > 0 && (
          <p className="flex justify-end text-red-400 text-sm">
            <Asterisk className="h-3 w-3" />
            Corrija os campos destacados antes de salvar
          </p>
        )}

        {error && (
          <p className="flex justify-end text-red-400 text-sm">
            <Asterisk className="h-3 w-3" />
            {error}
          </p>
        )}
        {successMessage && (
          <p className="flex justify-end text-green-400 text-sm">
            {successMessage}
          </p>
        )}


        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
            disabled={!isDirty || !isValid || loadingSubmit}
          >
            {loadingSubmit ? 'Enviando...' : 'Alterar Senha'}
          </button>
        </div>
      </div>
    </FormProvider>
  );
}
