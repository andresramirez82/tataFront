import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Customer } from '@models/customer';
import Email from "@components/UI/Email/Email";

interface Props {
  onSubmit: (customer: Customer) => void;
}

const CustomerForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [street, setStreet] = useState('');
  const [details, setDetails] = useState('');
  const [mail, setMail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCustomer: Customer = {
      id: 0, // Generar un ID temporal
      name,
      dni: parseInt(dni),
      street,
      details,
      mail
    };
    onSubmit(newCustomer);
    // Limpiar los campos después de enviar el formulario
    setName('');
    setDni('');
    setStreet('');
    setDetails('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formDni">
        <Form.Label>DNI</Form.Label>
        <Form.Control type="text" value={dni} onChange={(e) => setDni(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formStreet">
        <Form.Label>Calle</Form.Label>
        <Form.Control type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
      </Form.Group>
      <Email value={mail} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMail(e.target.value)} required aria-label='Correo electrónico'/>
      <Form.Group controlId="formDetails">
        <Form.Label>Detalles</Form.Label>
        <Form.Control type="text" value={details} onChange={(e) => setDetails(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Agregar Cliente
      </Button>
    </Form>
  );
};

export default CustomerForm;