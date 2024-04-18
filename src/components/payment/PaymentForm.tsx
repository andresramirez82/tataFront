import React, { useState } from 'react';
import { payments } from 'models/cart';
import { Form } from 'react-bootstrap';

interface PaymentFormProps {
  onSubmit: (payment: payments) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [tipo, setTipo] = useState<string>('');
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;


    if (form.checkValidity()) {
      const newPayment: payments = { tipo }; // Suponiendo que Payment tiene una propiedad 'tipo'
      onSubmit(newPayment);
      setTipo('');
    } else {
      // Si hay errores de validación, muestra los mensajes de error
      e.stopPropagation();
      setIsFormInvalid(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate validated={isFormInvalid}>
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">Tipo:</label>
        <input
          type="text"
          className="form-control"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary"><span className='bi bi-floppy' /> Crear Medio de pago</button>
    </Form>
  );
};

export default PaymentForm;