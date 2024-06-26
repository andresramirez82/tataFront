import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { CurrentAccount, Customer } from '../../models/customer';

interface Props {
  accounts: CurrentAccount[];
  customers: Customer[];
  onDelete: (id: number) => void;
}

const CurrentAccountList: React.FC<Props> = ({ accounts, customers, onDelete }) => {
  const getCustomerDebt = (customerId: number): string => {
    const customerAccounts = accounts.filter((account) => account.customer.id === customerId);
    const totalDebt = customerAccounts.reduce((total, account) => total + Number(account.balance), 0);
    return totalDebt.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Calle</th>
          <th>Detalles</th>
          <th>Deuda</th>
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
            <td>{customer.details}</td>
            <td>{getCustomerDebt(customer.id)}</td>
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

export default CurrentAccountList;