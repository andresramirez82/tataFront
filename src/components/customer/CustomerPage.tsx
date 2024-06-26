import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import { Customer } from '@models/customer';
import { getCustomers, createCustomer, deleteCustomer } from "@functions/customer";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { ErrorResponse } from "@models/models";
import CurrentAccount from "@components/CurrentAccount/CurrentAccountPage";

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleAddCustomer = (newCustomer: Customer) => {
    createCustomer(newCustomer).then(t => {
      toast(`Se agregó correctamente el Cliente ${t.name}`)
      actualiar();
    }).catch( () => {
      toast(`Huvo un error al agregar el cliente ${newCustomer.name}`)
    })

  };

  const handleDeleteCustomer = (id: number) => {
    deleteCustomer(id).then(t => {
      toast(`Se borró correctamente el Cliente ${t.name}`)
      actualiar();
    }).catch((err: AxiosError<ErrorResponse>) => {
      toast(`${err.response?.data.message}`)
    })
  };

  useEffect(() => {
    actualiar();
  }, [])

  const actualiar = () => {
    getCustomers().then(customer => {
      setCustomers(customer);
    })
  }


  return (
    <Container>
      <Tabs
        defaultActiveKey="Clientes"
        id="fill-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Clientes" title="Clientes">
          <Row>
            <Col>
              <h1>Clientes</h1>
              <CustomerForm onSubmit={handleAddCustomer} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CustomerList customers={customers} onDelete={handleDeleteCustomer} />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="ctacte" title="Cuenta Corriente">
          <Row>
            <Col>
              <CurrentAccount />
            </Col>
          </Row>
        </Tab>
      </Tabs>


    </Container>
  );
};

export default CustomerPage;