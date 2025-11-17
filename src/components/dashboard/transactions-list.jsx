import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/currency-provider';
import { transactionIcons } from '../../data/transaction-icons';
import { useTransactionsMe } from '../../hooks/use-api';

const TransactionItem = ({ description, category, value, isPositive }) => {
  const { currency } = useCurrency();
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
        {new Intl.NumberFormat(currency.locale, {
          style: 'currency',
          currency: currency.code,
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
    return (
      <p className="mt-4 text-center text-gray-500">
        Carregando suas transações...
      </p>
    );
  }

  if (!transactions.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="m-6 rounded-xl border border-gray-300 bg-white px-6 py-10 text-center shadow-sm sm:m-10 md:m-10">
          <p className="mb-3 font-bold text-gray-800 text-xl">
            Nenhuma transação encontrada
          </p>
          <p className="text-base text-gray-600">
            Inclua uma movimentação para visualizar seu histórico.
          </p>
        </div>
      </div>
    );
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
              description={transaction.descricao}
              isPositive={!isExpense}
              key={transaction.id}
              value={Math.abs(transaction.valor)}
            />
          );
        })}
      </div>
    </div>
  );
}
