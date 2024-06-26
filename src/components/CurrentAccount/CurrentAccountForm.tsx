import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CurrentAccount, Customer } from '@models/customer';

interface Props {
  customers: Customer[];
  onSubmit: (account: CurrentAccount) => void;
}

const CurrentAccountForm: React.FC<Props> = ({ customers, onSubmit }) => {
  const [balance, setBalance] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAccount: CurrentAccount = {
      id: 0, // Generar un ID temporal
      balance: parseFloat(balance),
      customer: customers.find((customer) => customer.id === selectedCustomer) || customers[0],
    };
    onSubmit(newAccount);
    // Limpiar los campos después de enviar el formulario
    setBalance('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBalance">
        <Form.Label>Saldo</Form.Label>
        <Form.Control type="text" value={balance} onChange={(e) => setBalance(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formCustomer">
        <Form.Label>Cliente</Form.Label>
        <Form.Control as="select" value={selectedCustomer} onChange={(e) => setSelectedCustomer(Number(e.currentTarget.value))}>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Agregar Cuenta Corriente
      </Button>
    </Form>
  );
};

export default CurrentAccountForm;