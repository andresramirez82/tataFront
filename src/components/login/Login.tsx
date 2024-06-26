import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login, reset } from "../../functions/api";
import { SaveUser } from "../../functions/functios";
import { useNavigate } from 'react-router-dom';
import { AxiosError } from "axios";
import { ErrorResponse } from "../../models/models";
import { toast } from "react-toastify";
import "./login.css";
import CompanyHead from "./CompanyHead";

// import { Auth } from "models/models";



function Login() {
  //const [users, setUsers] = useState<Auth.AuthUser[]>([]);
  // const [selectedUser, setSelectedUser] = useState<string>('');
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [logueado, setLogueado] = useState<boolean>(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [forgetp, setforgetp] = useState<boolean>(false)
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
          SaveUser(log.token, log.tokenRefresh);
          setLogueado(true);
        } else {
          setforgetp(true)
        }
      })
      .catch((err: AxiosError<ErrorResponse>) => {
        setforgetp(true)
        toast(`${err.response?.data.message}`);
        return;
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

  const forget = () => {
    reset(username).then(r => {
      toast.success(`${r.message}`);
      setforgetp(false);
    })
  }

  return (
    <div className="wrapper body">
      <div className="login">

        <CompanyHead />
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
          {forgetp && <a href='#' className="link-primary" onClick={forget}>¿ Olvidaste tu contraseña ?</a>}

        </Form>
      </div>
    </div>
  );
}

export default Login;