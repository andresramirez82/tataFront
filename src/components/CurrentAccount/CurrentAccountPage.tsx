import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CurrentAccountForm from './CurrentAccountForm';
import CurrentAccountList from './CurrentAccountList';
import { CurrentAccount, Customer } from 'models/customer';
import { getCurrentAccount, getCustomers, deleteCurrentAccount, createCurrentAccount } from "functions/customer";
import { toast } from 'react-toastify';

const CurrentAccountPage: React.FC = () => {
  const [accounts, setAccounts] = useState<CurrentAccount[]>([]);
  const [customers, setcustomers] = useState<Customer[]>([]);

  const handleAddAccount = (newAccount: CurrentAccount) => {
    createCurrentAccount(newAccount).then(n => {
        toast('Se agregó correctamente')
        actualiar();
    }).catch(err => {
        toast('Error al agregar cta cte')
    })
  };

  const handleDeleteAccount = (id: number) => {
    deleteCurrentAccount(id).then(del => {
        toast('Se borróp correctamente')
        actualiar();
    }).catch(err => {
        toast('Error al borrar cta cte')
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
          <CurrentAccountList accounts={accounts} onDelete={handleDeleteAccount} />
        </Col>
      </Row>
    </Container>
  );
};

export default CurrentAccountPage;