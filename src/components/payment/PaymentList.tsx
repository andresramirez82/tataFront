import React from 'react';
import { payments } from 'models/cart'; // Suponiendo que tienes un archivo types.ts donde defines el tipo Payment

interface PaymentListProps {
  payments: payments[];
  onDelete: (id: number) => void;
}

const PaymentList: React.FC<PaymentListProps> = ({ payments, onDelete }) => {
  return (
    <ul className="list-group">
      {payments.map(payment => (
        <li key={payment.id} className="list-group-item d-flex justify-content-between align-items-center">
          {payment.tipo}
          {payment.id && <button className="btn btn-danger" onClick={() => onDelete(Number(payment.id))}>Eliminar</button>}
          
        </li>
      ))}
    </ul>
  );
};

export default PaymentList;