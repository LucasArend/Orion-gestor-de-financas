import { useEffect, useState } from 'react';
import Notification from '../components/Notications/notifications';
import FinancialInfoTab from '../components/Settings/financial-info-tab';
import LoginSecurityTab from '../components/Settings/login-security-tab';
import Tab from '../components/Settings/menu-tab';
import PersonalInfoTab from '../components/Settings/personal-info-tab';

const settingsTabs = [
  { id: 'profile', name: 'Meu Perfil', component: PersonalInfoTab },
  { id: 'security', name: 'Login e Segurança', component: LoginSecurityTab },
  { id: 'financial', name: 'Finanças', component: FinancialInfoTab },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(settingsTabs[0].id);
  const ActiveComponent = settingsTabs.find(
    (tab) => tab.id === activeTab
  ).component;

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userData, setUserData] = useState(null);
  const [latestFormData, setLatestFormData] = useState({});
  const [formReset, setFormReset] = useState(null);

  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  useEffect(() => {
    setUserData({
      fullName: 'Pedro Henrique Avila',
      email: 'pedro.avila@email.com',
      username: 'pedro.avila',
      phone: '51991234567',
      bio: 'Desenvolvedor front-end apaixonado por tecnologia.',
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      country: '',
      currency: '',
      emergencyFund: '',
      totalIncome: '',
    });
  }, []);

  const handleSave = () => {
    if (activeTab === 'security') {
      formReset();
    }
    setUserData(latestFormData);
    setHasUnsavedChanges(false);
    showNotification('success', 'Alterações salvas com sucesso!');
  };

  const handleCancel = () => {
    if (formReset) {
      formReset();
    }
    setHasUnsavedChanges(false);
    setLatestFormData(userData);
    showNotification('error', 'Alterações canceladas.');
  };

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
            setFormResetCallback={setFormReset}
            setHasUnsavedChanges={setHasUnsavedChanges}
            setLatestFormData={setLatestFormData}
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
