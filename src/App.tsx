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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/login/Login";
import Home from "components/home/Home";
import ProductSearch from "components/product/ProductSearch";

const Stock = () => {return (<>stock</>)};


function App() {
  const [users, setusers] = useState<Auth.AuthUser[]>()
  useEffect(() => {
    getUsers().then(
      user => setusers(user)
    )
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} >
          <Route index element={<Stock />} />
          <Route path="/home/stock" element={<ProductSearch onProductFound={()=> console.log('searched')} />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
