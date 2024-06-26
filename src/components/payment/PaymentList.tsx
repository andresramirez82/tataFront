import React from 'react';
import { payments } from '@models/cart';
import { Table } from 'react-bootstrap';

interface PaymentListProps {
  payments: payments[];
  onDelete: (id: number) => void;
  onUpdate: (selectedPayment: payments) => void;
}

const Validar = (id: number) => {
  if (id > 4) {
    return false;
  } else {
    return true;
  }
}

const PaymentList: React.FC<PaymentListProps> = ({ payments, onDelete, onUpdate }) => {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <th><span className="bi-credit-card-2-back"></span> {payment.id}</th>
            <td>{payment.tipo}</td>
            <td>
              <div className='d-grid gap-2'>
                {payment.id && <>
                  <button className="btn btn-primary" onClick={() => onUpdate(payment)}><span className='bi bi-pencil' /> Editar</button>
                  <button className="btn btn-danger" onClick={() => onDelete(Number(payment.id))} disabled={Validar(payment.id)}><span className='bi bi-trash' /> Eliminar</button>
                </>}
              </div></td>
          </tr>
        ))}
      </tbody>

    </Table>
  );
};

export default PaymentList;