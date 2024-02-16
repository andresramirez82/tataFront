import React, { useEffect, useState } from 'react';
import PaymentForm from './PaymentForm';
import PaymentList from './PaymentList';
import { payments } from 'models/cart';
import { toast } from 'react-toastify';
import { getPayment, deletePayment, addPayment } from "functions/cart";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  // Agrega otras propiedades si es necesario
}


const PaymentPage: React.FC = () => {
  const [payments, setPayments] = useState<payments[]>([]);

  useEffect(() => {
    listar();

  
}, [])


const listar = () => {
    getPayment().then( payment => {
        setPayments(payment);
    })
}

  const handleAddPayment = (payment: payments) => {
    addPayment(payment).then(resp => {
        toast(`Se agregó correcatmente`);
        listar();
    })
   
  };

  const handleDeletePayment = (id: number) => {
    
    deletePayment(id).then( () => {
        setPayments(payments.filter(payment => payment.id !== id));
        toast(`Se Borró correcatmente`)
    }
    ).catch((err: AxiosError<ErrorResponse>) => {
        toast(`${err.response?.data.message}`)
    })
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-6">
          <h2>Agregar forma de Pago</h2>
          <PaymentForm onSubmit={handleAddPayment} />
        </div>
        <div className="col-md-6">
          <h2>Lista de formas de Pagos</h2>
          <PaymentList payments={payments} onDelete={handleDeletePayment} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;