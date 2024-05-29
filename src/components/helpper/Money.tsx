import React from 'react';

interface Props {
  amount: number;
  total?: boolean
}

const MoneyFormatter: React.FC<Props> = ({ amount, total }) => {
  const formattedAmount = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS', // Puedes cambiar 'EUR' por 'USD' u otra moneda según tus necesidades
    minimumFractionDigits: 0,
  }).format(amount);

  return <span>{total ? <strong>{formattedAmount}</strong> : formattedAmount}</span>;
};

export default MoneyFormatter;