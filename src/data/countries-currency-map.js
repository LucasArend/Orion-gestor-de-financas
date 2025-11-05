export const countryCurrencyMap = {
  BR: { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro', locale: 'pt-BR' },
  US: { code: 'USD', symbol: '$', name: 'Dólar Americano', locale: 'en-US' },
  DE: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  GB: { code: 'GBR', symbol: '£', name: 'Libra Esterlina', locale: 'en-GB'},
};

export const countriesOptions = [
  { code: '', label: 'Selecione um país' },
  { code: 'BR', label: 'BRA - Brasil' },
  { code: 'US', label: 'USA - Estados Unidos' },
  { code: 'DE', label: 'DEU - Alemanha' },
  { code: 'GB', label: 'GBR - Reino Unido' },
];

export const localeToCurrency = {
  'pt-BR': { code: 'BRL', locale: 'pt-BR' },
  'en-US': { code: 'USD', locale: 'en-US' },
  'en-GB': { code: 'GBP', locale: 'en-GB' },
  'de-DE': { code: 'EUR', locale: 'de-DE' },
};
