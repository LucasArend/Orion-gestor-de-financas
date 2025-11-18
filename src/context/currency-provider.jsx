import { createContext, useContext, useState } from 'react';
import { countryCurrencyMap } from '../data/countries-currency-map';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const DEFAULT = countryCurrencyMap['BR'];

  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('app:currency');
    return saved ? JSON.parse(saved) : DEFAULT;
  });

  const [country, setCountry] = useState(() => {
    const saved = localStorage.getItem('app:country');
    return saved || 'BR';
  });

  const [pendingCountry, setPendingCountry] = useState(null);

  const queueCountry = (cc) => {
    setPendingCountry(cc);
  };

  const commitCountry = () => {
    if (!pendingCountry) {return};

    const newCurrency = countryCurrencyMap[pendingCountry] ?? DEFAULT;

    setCountry(pendingCountry);
    setCurrency(newCurrency);

    localStorage.setItem('app:country', pendingCountry);
    localStorage.setItem('app:currency', JSON.stringify(newCurrency));

    setPendingCountry(null);
  };

  return (
    <CurrencyContext.Provider
      value={{
        country,
        currency,
        queueCountry,
        commitCountry,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
