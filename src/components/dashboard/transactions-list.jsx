import { ChevronRight } from 'lucide-react';
import { transactionIcons } from '../../data/transaction-icons';

const TransactionItem = ({ type, description, value, isPositive }) => {
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
          <p className="font-semibold text-gray-800">{type}</p>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
      <p className={`font-semibold ${color}`}>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value)}
      </p>
    </div>
  );
};

export default function TransactionsList({ transactions }) {
  const maxItems = 5;
  const shouldShowButton = transactions.length > maxItems;
  const transactionsToShow = shouldShowButton
    ? transactions.slice(0, maxItems)
    : transactions;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Transações recentes</h3>
        {shouldShowButton && (
          <button
            className="flex items-center font-semibold text-gray-800 text-sm hover:underline"
            type="button"
          >
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        )}
      </div>
      <div className="space-y-2">
        {transactionsToShow.map((transaction) => (
          <TransactionItem
            description={transaction.description}
            isPositive={transaction.value >= 0}
            key={transaction.id}
            type={transaction.type}
            value={transaction.value}
          />
        ))}
      </div>
    </div>
  );
}
