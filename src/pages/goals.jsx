import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import AddGoalModal from '../components/Goals/add-goal-modal';
import GoalsFilters from '../components/Goals/goals-filters';
import GoalsHeader from '../components/Goals/goals-header';
import GoalsTable from '../components/Goals/goals-table';
import Notification from '../components/Notications/notifications';
import { fieldOptions, valueOptions } from '../data/goals-options';

const metasMock = [
  {
    id: 1,
    objetivo: 'Viagem',
    meta: 4000,
    poupado: 3200,
    contribuicao: 100,
    previsao: '2025-09-01',
    dataAlmejada: '2026-02-01',
  },
  {
    id: 2,
    objetivo: 'Carro novo',
    meta: 15_000.33,
    poupado: 8000,
    contribuicao: 500,
    previsao: '2026-08-01',
    dataAlmejada: '2027-01-01',
  },
  {
    id: 3,
    objetivo: 'Fundo de estudos',
    meta: 10_000,
    poupado: 1500,
    contribuicao: 200,
    previsao: '2028-03-01',
    dataAlmejada: '2030-01-01',
  },
  {
    id: 4,
    objetivo: 'Reforma',
    meta: 20_000,
    poupado: 500,
    contribuicao: 100,
    previsao: '2025-04-01',
    dataAlmejada: '2026-01-01',
  },
  {
    id: 5,
    objetivo: 'Paris',
    meta: 50_000,
    poupado: 0,
    contribuicao: 300,
    previsao: '2028-04-01',
    dataAlmejada: '2028-01-01',
  },
  {
    id: 6,
    objetivo: 'Casa',
    meta: 100_000,
    poupado: 1000,
    contribuicao: 200,
    previsao: '01-10-2027',
    dataAlmejada: '2027-01-01',
  },
];

export default function Goals() {
  const [metas] = useState(metasMock);
  const [search, setSearch] = useState('');
  const [campo, setCampo] = useState('');
  const [ordem, setOrdem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };
  const filteredMetas = metas
    .filter((m) => m.objetivo.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (!(campo && ordem)) {
        return 0;
      }
      const valueA = campo === 'meta' ? a.meta : new Date(a[campo]);
      const valueB = campo === 'meta' ? b.meta : new Date(b[campo]);

      if (ordem === 'asc') {
        return valueA > valueB ? 1 : -1;
      }
      return valueA < valueB ? 1 : -1;
    });

  return (
    <div className="space-y-6 rounded-lg bg-white p-8">
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* 1. Cabeçalho */}
      <GoalsHeader onAddGoalClick={() => setIsModalOpen(true)} />

      {/* 2. Filtros */}
      <GoalsFilters
        field={campo}
        fieldOptions={fieldOptions}
        order={ordem}
        search={search}
        setField={setCampo}
        setOrder={setOrdem}
        setSearch={setSearch}
        valueOptions={valueOptions}
      />

      {/* 3. Tabela de Metas */}
      <GoalsTable metas={filteredMetas} />

      {/* 4. Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <AddGoalModal
            key="modal"
            onClose={() => setIsModalOpen(false)}
            onError={() => showNotification('error', 'Erro ao salvar meta.')}
            onSuccess={() =>
              showNotification('success', 'Meta salva com sucesso!')
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
