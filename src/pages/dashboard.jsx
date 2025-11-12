import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChartExpenses from '../components/Dashboard/expenses-chart';
import GoalsList from '../components/Dashboard/goals-list';
import RemindersList from '../components/Dashboard/reminder-list';
import TransactionsList from '../components/Dashboard/transactions-list';
import { cardInfoDashboard } from '../data/dashboard-card-info';
import { useUserMe } from '../hooks/use-api';
import { useDashboardData } from '../hooks/use-dashboard-data';
import { getTextColor } from '../utils/get-text-color';

export default function Dashboard() {
  const { cardData } = useDashboardData();
  const { data: users } = useUserMe();
  const navigate = useNavigate();
  const now = new Date();
  const formattingOptions = { month: 'long', year: 'numeric' };
  const today = now.toLocaleString('pt-BR', formattingOptions);

  return (
    <div className="space-y-5">
      <section>
        <h1 className="font-bold text-3xl text-gray-700">Olá, {users?.name}</h1>
        <p className="mt-1 mb-6 text-gray-500">
          Aqui está sua visão geral financeira para {today}
        </p>
      </section>

      {/* Seção de Cards e Lembretes */}
      <section className="grid items-stretch gap-4 lg:grid-cols-2">
        {/* Container para os Cards */}
        <div className="grid grid-cols-2 items-stretch gap-4">
          {cardData.map((data) => {
            const config = cardInfoDashboard[data.categoria];
            if (!config) {
              return null;
            }
            const { title, Icon } = config;
            return (
              <div
                className="flex flex-col items-start justify-center rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50 transition-all duration-300 hover:scale-95"
                key={data.id}
              >
                <div className="mb-4 rounded-full bg-gray-200 p-3 shadow-lg shadow-zinc-400/50">
                  <Icon className="h-8 w-8 text-[#314259]" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="overflow-hidden text-ellipsis font-semibold text-gray-500 text-lg">
                    {title}
                  </h3>
                  <p
                    className={`mt-2 font-bold text-3xl ${getTextColor(title, data.valor)}`}
                  >
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(data.valor)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Container para a Lista de Lembretes */}
        <div className="rounded-lg shadow-lg shadow-zinc-400/50">
          <RemindersList className="lg:col-span-2" />
        </div>
      </section>

      {/* Seção de Gráfico e Transações */}
      <section className="grid items-stretch gap-4 lg:grid-cols-2">
        {/* Gráfico de Gastos */}
        <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
          <h3 className="mb-4 font-semibold text-2xl">Gastos por Categoria</h3>
          <div className="min-h-0 flex-1">
            <ChartExpenses />
          </div>
        </div>
        {/* Transações Recentes */}
        <div className="flex flex-col rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
          <TransactionsList />
        </div>
      </section>

      {/* Seção de Metas */}
      <section className="rounded-lg bg-white p-6 shadow-lg shadow-zinc-400/50">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 text-xl">Metas</h2>
          <button
            className="flex items-center space-x-2 rounded-lg bg-[#2979FF] px-4 py-2 text-white shadow-[#2161E5]/50 shadow-lg transition-colors hover:bg-[#2161E5]"
            onClick={() => navigate('/metas')}
            type="button"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar Meta</span>
          </button>
        </div>
        <GoalsList />
      </section>
    </div>
  );
}
