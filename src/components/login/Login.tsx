import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardBody from 'react-bootstrap/CardBody';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardFooter from "react-bootstrap/CardFooter";
import { getUsers, login } from "../../functions/api";
import { Auth } from "models/models";
import { formatDate, SaveUser } from "functions/functios";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [users, setusers] = useState<Auth.AuthUser[]>();
  const [logueado, setlogueado] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then(
      user => {setusers(user)
      if (user.length === 0) {
        navigate('/users');
      }
      }
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (logueado) {
      navigate('/home');
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logueado])
  

  const LoginFn = (name: string, id: number) => {
    login(id).then(log => {
      if (log?.user?.lastlogin !== null) {
        SaveUser(id, name, log.user.lastlogin);
        setlogueado(true);
      }
    })
  }

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
                  <CardBody className="text-bg-success"><Button onClick={() => LoginFn(u.name, u.id)}>{u.name}</Button></CardBody>
                  <CardFooter>{formatDate(u.lastlogin)}</CardFooter>
                </Card>);
            })}
          </div>
        </Col>

      </Row>
    </Container >
  );
}

export default Login;
