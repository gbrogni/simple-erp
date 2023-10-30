export function formatToCurrency(valueInCents: number) {
    const valueInReal = valueInCents / 100;
    const formattedNumber = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valueInReal);
  
    return formattedNumber;
  }