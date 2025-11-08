import { useMemo, useRef, useState } from 'react';
import Notification from '../components/Notications/notifications';
import FinancialInfoTab from '../components/Settings/financial-info-tab';
import LoginSecurityTab from '../components/Settings/login-security-tab';
import Tab from '../components/Settings/menu-tab';
import PersonalInfoTab from '../components/Settings/personal-info-tab';
import {
  useUpdatePassword,
  useUpdateUserMe,
  useUserMe,
} from '../services/api-hooks';

const settingsTabs = [
  { id: 'profile', name: 'Meu Perfil', component: PersonalInfoTab },
  { id: 'security', name: 'Login e Segurança', component: LoginSecurityTab },
  { id: 'financial', name: 'Finanças', component: FinancialInfoTab },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(settingsTabs[0].id);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formReset, setFormReset] = useState(null);
  const [notification, setNotification] = useState(null);
  const formGetterRef = useRef(null);

  const { data: user, isLoading, isError } = useUserMe();
  const updateUser = useUpdateUserMe();
  const updatePassword = useUpdatePassword();

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const handleSave = async () => {
    if (!formGetterRef.current) {
      return;
    }

    try {
      const formData = formGetterRef.current();

      let payload = {};

      if (activeTab === 'profile') {
        payload = {
          name: formData.fullName,
          username: formData.email,
          roles: ['USER'],
        };

        await updateUser.mutateAsync(payload);
      } else if (activeTab === 'security') {
        payload = {
          currentPassword: formData.password,
          newPassword: formData.newPassword,
        };
        await updatePassword.mutateAsync(payload);
        formReset();
      } else if (activeTab === 'financial') {
        payload = {
          name: formData.fullName,
          username: formData.email,
          roles: ['USER'],
        };
      }

      setHasUnsavedChanges(false);
      showNotification('success', 'Alterações salvas com sucesso!');
    } catch (error) {
      console.error(error);
      showNotification('error', 'Erro ao salvar alterações.');
    }
  };

  const handleCancel = () => {
    formReset?.();
    setHasUnsavedChanges(false);
    showNotification('error', 'Alterações canceladas.');
  };

  const userData = useMemo(
    () => ({
      fullName: user?.name,
      email: user?.username,
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      country: '',
      currency: '',
      emergencyFund: '',
      totalIncome: '',
    }),
    [user]
  );

  const ActiveComponent = useMemo(
    () => settingsTabs.find((tab) => tab.id === activeTab).component,
    [activeTab]
  );

  if (isError) {
    return <p>Erro ao carregar dados do usuário.</p>;
  }

  return (
    <div className="space-y-6">
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <div className="rounded-lg bg-white px-8 py-6 shadow-sm">
        <h2 className="mb-4 font-bold text-2xl text-gray-800">Configurações</h2>

        {/* Menu de Abas Horizontais */}
        <div className="border-gray-200 border-b">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {settingsTabs.map((tab) => (
              <Tab
                id={tab.id}
                isActive={activeTab === tab.id}
                key={tab.id}
                name={tab.name}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </nav>
        </div>

        {/* Conteúdo da Aba Ativa */}
        <div className="mt-7">
          <ActiveComponent
            registerFormGetter={(getter) => (formGetterRef.current = getter)}
            setFormResetCallback={setFormReset}
            setHasUnsavedChanges={setHasUnsavedChanges}
            userData={userData}
          />
        </div>
      </div>

      {/* Botões de Ação Global (Salvar/Cancelar) */}
      <div className="flex justify-end space-x-4">
        <button
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            hasUnsavedChanges
              ? 'bg-zinc-200 text-gray-700 shadow-lg shadow-zinc-400/50 hover:bg-zinc-300'
              : 'cursor-not-allowed bg-zinc-200/60 text-gray-400'
          }`}
          disabled={!hasUnsavedChanges}
          onClick={handleCancel}
          type="button"
        >
          Cancelar
        </button>
        <button
          className={`rounded-lg px-4 py-2 font-medium transition-colors ${
            hasUnsavedChanges
              ? 'bg-[#2979FF] text-white shadow-[#2161E5]/50 shadow-lg transition-colors hover:bg-[#2161E5]'
              : 'cursor-not-allowed bg-[#2979FF]/50 text-white'
          }`}
          disabled={!hasUnsavedChanges}
          onClick={handleSave}
          type="button"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
