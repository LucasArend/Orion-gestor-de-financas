export function getTextColor(title, value){
  if (title === 'Taxa de Poupança' || title === 'Reserva de Emergência') {
    return 'text-blue-800';
  }
  
  if (title === 'Despesas Totais') {
    return 'text-zinc-600'
  }

    if (title === 'Gastos Totais') {
      return 'text-red-600';
    }

    return value >= 0 ? 'text-green-600' : 'text-red-600';
}
