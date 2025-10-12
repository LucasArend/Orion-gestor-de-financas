import React from 'react';

const stocks = [
  { name: 'Microsoft', symbol: 'MSFT' },
  { name: 'Apple', symbol: 'AAPL' },
  { name: 'Alphabet', symbol: 'GOOG' },
  { name: 'Meta', symbol: 'META' },
  { name: 'Amazon', symbol: 'AMZN' },
];

export default function Sidebar() {
  return (
    <aside className="bg-white dark:bg-gray-800 w-64 h-screen p-5 shadow-md">
      <h2 className="text-lg font-bold mb-4">Ações Favoritas</h2>
      <ul className="space-y-3">
        {stocks.map((stock) => (
          <li key={stock.symbol} className="hover:text-blue-500 cursor-pointer">
            {stock.name} ({stock.symbol})
          </li>
        ))}
      </ul>
    </aside>
  );
}
