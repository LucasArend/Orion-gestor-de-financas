import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TICKERS = [
  { symbol: 'SPY', name: 'S&P 500' },
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'GOOG', name: 'Google' },
  { symbol: 'AMZN', name: 'Amazon' },
];

const API_KEY = 'A02OKXLVSLAO1WLL';
const CACHE_TTL = 1000 * 60 * 60 * 24; // 1 dia

export default function Finance() {
  const [activeSymbol, setActiveSymbol] = useState('SPY');
  const [period, setPeriod] = useState(15);
  const [data, setData] = useState([]);
  const [change, setChange] = useState(0);
  const [loading, setLoading] = useState(true);

  const getCacheKey = (symbol, days) => `stock_${symbol}_${days}`;

  const fetchData = async (symbol, days) => {
    const cacheKey = getCacheKey(symbol, days);
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const { timestamp, data, change } = JSON.parse(cached);
      const isFresh = Date.now() - timestamp < CACHE_TTL;

      if (isFresh) {
        setData(data);
        setChange(change);
        setLoading(false);
        return;
      } else {
        localStorage.removeItem(cacheKey);
      }
    }

    setLoading(true);
    try {
      const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
      const res = await axios.get(URL);
      const series = res.data['Time Series (Daily)'];

      if (!series) throw new Error('Dados inválidos');

      const sorted = Object.keys(series).slice(0, days).reverse();
      const chartData = sorted.map(date => ({
        date,
        price: parseFloat(series[date]['4. close']),
      }));

      const first = chartData[0]?.price || 1;
      const last = chartData.at(-1)?.price || 1;
      const percent = (((last - first) / first) * 100).toFixed(2);

      // Cache
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data: chartData, change: percent })
      );

      setData(chartData);
      setChange(Number(percent));
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeSymbol, period);
  }, [activeSymbol, period]);

  const isPositive = change >= 0;
  const chartColor = isPositive ? '#3B82F6' : '#EF4444';

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ativos</h2>
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
          {TICKERS.map(ticker => (
            <button
              key={ticker.symbol}
              onClick={() => setActiveSymbol(ticker.symbol)}
              className={`transition px-4 py-2 rounded-lg text-sm font-medium border
                ${
                  activeSymbol === ticker.symbol
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600'
                }`}
            >
              {ticker.name}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">Período</h3>
          <div className="flex gap-2">
            {[7, 15, 30].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-sm rounded border transition
                  ${
                    period === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-600'
                  }`}
              >
                {p} dias
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all duration-500">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {TICKERS.find(t => t.symbol === activeSymbol)?.name}
          </h1>
          <div
            className={`flex items-center text-md font-medium ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            {change}%
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-300 animate-pulse">Carregando dados...</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={0.05} />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" domain={['dataMin - 1', 'dataMax + 1']} />
              <Tooltip />
              <Line
                type="linear" // Linhas mais retas
                dataKey="price"
                stroke={chartColor}
                strokeWidth={2}
                fill="url(#gradient)"
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
