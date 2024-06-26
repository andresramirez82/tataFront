import React, { useEffect, useState } from 'react';
import PaymentForm from './PaymentForm';
import PaymentList from './PaymentList';
import { payments } from '../../models/cart';
import { toast } from 'react-toastify';
import { getPayment, deletePayment, addPayment } from "../../functions/cart";
import { AxiosError } from "axios";
import PaymentEdit from "./PaymentEdit";
import {  ErrorResponse} from "../../models/models";

const PaymentPage: React.FC = () => {
  const [payments, setPayments] = useState<payments[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<payments>();


  useEffect(() => {
    listar();


  }, [])


  const listar = () => {
    getPayment().then(payment => {
      setPayments(payment);
    })
  }

  const handleAddPayment = (payment: payments) => {
    addPayment(payment).then(resp => {
      toast(`Se agregó correcatmente`);
      listar();
    }).catch((err: AxiosError<ErrorResponse>) => {
      toast(`${err.response?.data.message}`)
    })

  };

  const handleDeletePayment = (id: number) => {

    deletePayment(id).then(() => {
      setPayments(payments.filter(payment => payment.id !== id));
      toast(`Se Borró correcatmente`)
    }
    ).catch((err: AxiosError<ErrorResponse>) => {
      toast(`${err.response?.data.message}`)
    })
  };


  const handleUpdatePayment = (selectedPayment: payments) => {
    setSelectedPayment(
      selectedPayment
    )
    setShowUpdateModal(true)
  };

  // Función para cerrar el modal de actualización
  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedPayment(undefined);
  };

  const onUpdate = () => {
    toast(`Se editó corretamente el método de pago ${selectedPayment?.id}`);
    listar();
  }

  return (
    <div className="container mt-4">
      <h2><span className="bi bi-credit-card." /> <span className='bi bi-credit-card'/> Administración de Medios de pago</h2>
      <PaymentForm onSubmit={handleAddPayment} />
      <h4 className="mt-4">Lista de Medios de pago</h4>
      <PaymentList payments={payments} onDelete={handleDeletePayment} onUpdate={handleUpdatePayment} />

      {selectedPayment && <PaymentEdit show={showUpdateModal} onHide={handleCloseUpdateModal} selectdPayment={selectedPayment} onUpdate={onUpdate}/>}
    </div>


  );
};

export default PaymentPage;