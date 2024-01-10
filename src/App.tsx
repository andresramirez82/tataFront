import { useEffect, useState } from "react";
import { getUsers } from "./functions/api";
import { Auth } from "models/models";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/login/Login";
import Home from "components/home/Home";
import ProductSearch from "components/product/ProductSearch";
import Sales from "components/sales/Sales";

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
          <Route path="/home/stock/:searchtext" element={<ProductSearch onProductFound={()=> console.log('searched')}/>} />
          <Route path="/home/Sales" element={<Sales />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
