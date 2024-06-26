import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CurrentAccountForm from './CurrentAccountForm';
import CurrentAccountList from './CurrentAccountList';
import { CurrentAccount, Customer } from '@models/customer';
import { getCurrentAccount, getCustomers, deleteCurrentAccount, createCurrentAccount } from "@functions/customer";
import { toast } from 'react-toastify';

const CurrentAccountPage: React.FC = () => {
  const [accounts, setAccounts] = useState<CurrentAccount[]>([]);
  const [customers, setcustomers] = useState<Customer[]>([]);

  const handleAddAccount = (newAccount: CurrentAccount) => {
    createCurrentAccount(newAccount).then(() => {
      toast.success('Se agregó correctamente')
      actualiar();
    }).catch(err => {
      toast.error(`${err.response?.data.message}`)
    })
  };

  const handleDeleteAccount = (id: number) => {
    deleteCurrentAccount(id).then(() => {
      toast.success('Se borróp correctamente')
      actualiar();
    }).catch(err => {
      toast.error(`${err.response?.data.message}`)
    })
  };

  const actualiar = () => {
    getCurrentAccount().then(customer => {
      setAccounts(customer);
    }).catch(e => {
      console.error(e)
    })
  }

  useEffect(() => {
    actualiar();
    actualiarCustomer();
  }, [])

  const actualiarCustomer = () => {
    getCustomers().then(customer => {
      setcustomers(customer);
    }).catch(e => {
      console.error(e)
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Cuentas Corrientes</h1>
          <CurrentAccountForm customers={customers} onSubmit={handleAddAccount} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CurrentAccountList customers={customers} accounts={accounts} onDelete={handleDeleteAccount} />
        </Col>
      </Row>
    </Container>
  );
};

export default CurrentAccountPage;