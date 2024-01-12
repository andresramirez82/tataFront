import React from 'react';

interface Props {
  amount: number;
}

const MoneyFormatter: React.FC<Props> = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS', // Puedes cambiar 'EUR' por 'USD' u otra moneda según tus necesidades
    minimumFractionDigits: 0,
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default MoneyFormatter;