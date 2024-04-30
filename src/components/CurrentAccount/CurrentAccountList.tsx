import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { CurrentAccount } from 'models/customer';

interface Props {
  accounts: CurrentAccount[];
  onDelete: (id: number) => void;
}

const CurrentAccountList: React.FC<Props> = ({ accounts, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Saldo</th>
          <th>Cliente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {accounts && accounts.map((account) => (
          <tr key={account.id}>
            <td>{account.id}</td>
            <td>{account.balance}</td>
            <td>{account?.customer?.name}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(account.id)}>
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