import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardBody from 'react-bootstrap/CardBody';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardFooter from "react-bootstrap/CardFooter";
import { getUsers } from "./functions/api";
import { Auth } from "models/models";
import { formatDate } from "functions/functios";


function App() {
  const [users, setusers] = useState<Auth.AuthUser[]>()
  useEffect(() => {
    getUsers().then(
      user => setusers(user)
    )
  }, [])

  return (
    <Container className="mt-5 custom-container">
      <Col>
        <Row md={12} className="mb-4">
          <h1>Elija un usuario</h1>
        </Row>

      </Col>
      <Row>
        <Col>
          <div className="card-group gap-3">
            {users && users.map((u, i) => {
              return (
                <Card key={`card${i}`} className="text-bg-success">
                  <CardBody className="text-bg-success"><Button>{u.name}</Button></CardBody>
                  <CardFooter>{formatDate(u.lastlogin)}</CardFooter>
                </Card>);
            })}
          </div>
        </Col>

      </Row>
    </Container >
  );
}

export default App;
