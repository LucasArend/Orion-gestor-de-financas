import { useCurrency } from '../../context/currency-provider';
import { useIncome, useTransactionsMe } from '../../hooks/use-api';

const PALETTE = [
  '#2979FF',
  '#FF6B6B',
  '#FFD166',
  '#4CAF50',
  '#9C27B0',
  '#1B998B',
  '#F25F5C',
  '#F2C14E',
  '#90BE6D',
  '#577590',
];

const categoryColorMap = {};

function getCategoryColor(name) {
  if (categoryColorMap[name]) {
    return categoryColorMap[name];
  }

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % PALETTE.length;
  const color = PALETTE[index];

  categoryColorMap[name] = color;
  return color;
}

export default function CategorySummary() {
  const { data: income } = useIncome();
  const { data: transactions } = useTransactionsMe();
  const { currency } = useCurrency();
  const percent = 100;

  if (!(transactions && income)) {
    return null;
  }

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const monthlyExpenses = transactions.filter((t) => {
    const date = new Date(t.dataVencimento);
    return (
      t.tipoTransacao?.nome.toUpperCase() === 'DESPESA' &&
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  });

  const grouped = monthlyExpenses.reduce((acc, item) => {
    const name = item.categoria?.nome || 'Sem categoria';

    if (!acc[name]) {
      acc[name] = { name, value: 0 };
    }
    acc[name].value += item.valor;

    return acc;
  }, {});

  let categories = Object.values(grouped);

  categories.sort((a, b) => b.value - a.value);

  const dataSize = 4;
  const categoriesDisplayed = 5;

  if (categories.length > categoriesDisplayed) {
    const topForCategories = categories.slice(0, dataSize);
    const others = categories.slice(dataSize);

    const otherSum = others.reduce((acc, c) => acc + c.value, 0);

    categories = [...topForCategories, { name: 'Outras', value: otherSum }];
  }

  return (
    <div className="flex flex-col space-y-4">
      {categories.map((item) => {
        const percentage = income > 0 ? (item.value / income) * percent : 0;

        return (
          <div className="flex items-center justify-between" key={item.name}>
            <div className="flex items-center gap-3">
              <span
                className="h-3.5 w-3.5 rounded-full"
                style={{
                  backgroundColor: getCategoryColor(item.name),
                }}
              />
              <span className="font-medium text-gray-700 text-sm">
                {item.name}
              </span>
            </div>

            <div className="text-right">
              <p className="font-semibold text-gray-800 text-sm">
                {new Intl.NumberFormat(currency.locale, {
                  style: 'currency',
                  currency: currency.code,
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(item.value)}
              </p>
              <p className="text-gray-400 text-xs">{percentage.toFixed(2)}%</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
