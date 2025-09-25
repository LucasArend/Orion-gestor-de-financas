export function getTextColor(title, value){
  if (title === 'Taxa de Poupança' || title === 'Reserva de Emergência') {
    return 'text-blue-800';
  }
    return value >= 0 ? 'text-green-600' : 'text-red-600';
}
