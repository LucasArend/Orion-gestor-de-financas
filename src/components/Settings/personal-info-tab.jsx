import { yupResolver } from '@hookform/resolvers/yup';
import { AtSign, Mail, Smartphone, UserRound } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { personalInfoSchema } from '../../utils/validation-schema';  // Certifique-se de que o schema esteja correto
import Avatar from '../Avatar/avatar';
import MaskedInput from '../Input/masked-input';
import TextAreaInput from '../Input/text-area-input';
import TextInput from '../Input/text-input';

export default function PersonalInfoTab({
  userData,
  setHasUnsavedChanges,
  setLatestFormData,
  setFormResetCallback,
}) {
  const methods = useForm({
    defaultValues: userData,  // Passando os dados para o React Hook Form
    resolver: yupResolver(personalInfoSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { formState, reset, watch, getValues } = methods;
  const { isValid, isDirty } = formState;
  const fullName = watch('fullName');  // Para exibir o nome completo no Avatar

  // Usando o efeito para resetar o formulário com os dados do usuário
  useEffect(() => {
    const resetToOriginal = () => {
      reset(userData, { keepDirty: false });
      setHasUnsavedChanges(false);
    };
    setFormResetCallback(() => resetToOriginal);
  }, [setFormResetCallback, reset, userData, setHasUnsavedChanges]);

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  useEffect(() => {
    const shouldEnableSave = isDirty && isValid;
    setHasUnsavedChanges(shouldEnableSave);

    if (shouldEnableSave) {
      setLatestFormData(getValues());
    }
  }, [isDirty, isValid, setHasUnsavedChanges, getValues, setLatestFormData]);

  return (
    <FormProvider {...methods}>
      <form className="space-y-6">
        <h3 className="text-base text-gray-500">Sua Foto de Perfil</h3>

        <div className="flex items-center space-x-6">
          <Avatar
            key="user-avatar"
            name={fullName || ''}  // Exibindo o nome completo no Avatar
            style={'h-28 w-28 text-6xl'}
          />

          <div className="space-x-4">
            <button
              className="rounded-lg bg-[#2979FF] px-4 py-2 text-white transition-colors hover:bg-[#2161E5]"
              type="button"
            >
              Alterar
            </button>
            <button
              className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
              type="button"
            >
              Remover Foto
            </button>
          </div>
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
          <TextInput
            icon={UserRound}
            label="Nome Completo"
            name="fullName"
            placeholder="Digite seu nome"
          />
          <TextInput
            icon={Mail}
            label="E-mail"
            name="email"
            placeholder="exemplo@email.com"
            type="email"
          />
          <TextInput
            icon={AtSign}
            label="Nome de Usuário"
            name="username"
            placeholder="Digite seu nome de usuário"
          />
          <MaskedInput
            icon={Smartphone}
            label="Celular"
            mask="(00) 0 0000-0000"
            name="phone"
            placeholder="(XX) X XXXX-XXXX"
          />
        </div>

        <TextAreaInput label="Bio" name="bio" />
      </form>
    </FormProvider>
  );
}
