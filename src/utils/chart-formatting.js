import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const getRecentMonthsData = (data, months) =>
  data
    .slice()
    .sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime())
    .slice(0, months)
    .reverse();

export const getChartLabels = (recentMonths) => {
  const years = new Set(recentMonths.map((item) => parseISO(item.month).getFullYear()));
  const showYear = years.size > 1;

  return recentMonths.map((item) => {
    const date = parseISO(item.month);
    const pattern = showYear ? "MMM/yy" : "MMM";
    const raw = format(date, pattern, { locale: ptBR });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  });
};
