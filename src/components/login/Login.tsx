import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../../functions/api";
import { SaveUser } from "functions/functios";
import { useNavigate } from 'react-router-dom';
import { AxiosError } from "axios";
import { ErrorResponse } from "models/models";
import { toast } from "react-toastify";
// import { Auth } from "models/models";

function Login() {
  //const [users, setUsers] = useState<Auth.AuthUser[]>([]);
  // const [selectedUser, setSelectedUser] = useState<string>('');
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [logueado, setLogueado] = useState<boolean>(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const navigate = useNavigate();

 /* useEffect(() => {
    getUsers().then(users => {
      //setUsers(users);
    });
  }, [navigate]);*/

  useEffect(() => {
    if (logueado) {
      navigate('/home');
    }
  }, [logueado, navigate]);

  const handleLogin = () => {
    if (!username || !password) return;

    login(username, password)
      .then(log => {
        if (log?.user?.lastlogin !== null) {
          SaveUser(log.token);
          setLogueado(true);
        }
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        toast(`${err.response?.data.message}`);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsFormInvalid(false);
      handleLogin();
    } else {
      e.stopPropagation();
      setIsFormInvalid(true);
    }
    form.classList.add("was-validated");
  };

  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <div className="login-form p-4 rounded bg-light" style={{ maxWidth: "700px", width: "70%", minWidth:'70%', boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)', minHeight: '30%' }}>
      <h2 className="text-center mb-4">Iniciar sesión</h2>
      <Form onSubmit={handleSubmit} noValidate validated={isFormInvalid}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese su nombre de usuario.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingrese su contraseña.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Iniciar sesión
        </Button>
      </Form>
    </div>
  </Container>
  );
}

export default Login;