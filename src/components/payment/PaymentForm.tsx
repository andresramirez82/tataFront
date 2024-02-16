import React, { useState } from 'react';
import { payments } from 'models/cart'; // Suponiendo que tienes un archivo types.ts donde defines el tipo Payment

interface PaymentFormProps {
  onSubmit: (payment: payments) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [tipo, setTipo] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPayment: payments = { tipo }; // Suponiendo que Payment tiene una propiedad 'tipo'
    onSubmit(newPayment);
    setTipo('');
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
};

export default PaymentForm;