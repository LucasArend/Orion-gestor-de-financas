import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { transactionIcons } from '../../data/transaction-icons';
import { useTransactionsMe } from '../../services/api-hooks';

const TransactionItem = ({ description, category, value, isPositive }) => {
  const status = isPositive ? 'positive' : 'negative';
  const { icon: Icon, color, bgColor } = transactionIcons[status];

  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-100 p-4 hover:bg-zinc-200">
      <div className="flex items-center">
        {/* Ícone com fundo colorido */}
        <div className={`rounded-full p-2 ${bgColor} flex-shrink-0`}>
          <Icon className={`h-5 w-5 ${color}`} />
        </div>
        <div className="ml-4">
          <p className="font-semibold text-gray-800">{description}</p>
          <p className="text-gray-500 text-sm">{category}</p>
        </div>
      </div>
      <p className={`font-semibold ${color}`}>
        {isPositive ? '' : '-'}
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value)}
      </p>
    </div>
  );
};

export default function TransactionsList() {
  const { data: transactions = [], isLoading } = useTransactionsMe();
  const maxItems = 5;
  const shouldShowButton = transactions.length > maxItems;
  const transactionsToShow = shouldShowButton
    ? transactions.slice(0, maxItems)
    : transactions;
  const navigate = useNavigate();

  if (isLoading) {
    return <p className="text-gray-500">Carregando transações...</p>;
  }

  if (!transactions.length) {
    return <p className="text-gray-500">Nenhuma transação encontrada.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Transações recentes</h3>
        {shouldShowButton && (
          <button
            className="flex items-center font-semibold text-gray-800 text-sm hover:underline"
            onClick={() => navigate('/transacao')}
            type="button"
          >
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        )}
      </div>
      <div className="space-y-2">
        {transactionsToShow.map((transaction) => {
          const isExpense =
            transaction.tipoTransacao?.nome?.toLowerCase() === 'despesa';

          return (
            <TransactionItem
              category={transaction.categoria?.nome}
              isPositive={!isExpense}
              key={transaction.id}
              description={transaction.descricao}
              value={Math.abs(transaction.valor)}
            />
          );
        })}
      </div>
    </div>
  );
}
