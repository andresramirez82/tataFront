import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Customer } from '@models/customer';
import Mail from "@components/helpper/Mail";

interface Props {
  customers: Customer[];
  onDelete: (id: number) => void;
}



const CustomerList: React.FC<Props> = ({ customers, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Calle</th>
          <th>Mail</th>
          <th>Detalles</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.dni}</td>
            <td>{customer.street}</td>
            <td><Mail email={customer.mail} name={customer.name} /></td>
            <td>{customer.details}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(customer.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerList;