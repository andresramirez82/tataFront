import { useEffect, useState } from "react";
import { getUsers } from "./functions/api";
import { Auth } from "models/models";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/login/Login";
import Home from "components/home/Home";
import ProductSearch from "components/product/ProductSearch";
import Sales from "components/sales/Sales";
import UserManagement from "components/users/UserManagement";
import PaymentPage from "components/payment/PaymentPage";
import Settings from "components/settings/Settings";
import ListProd from "components/product/ListProd";
import DiscountManagementScreen from "components/discount/DiscountManagementScreen";

const Stock = () => { return (<></>) };


function App() {
  const [users, setusers] = useState<Auth.AuthUser[]>()
  useEffect(() => {
    getUsers().then(
      user => setusers(user)
    )
    if (users)
      console.log('Aplicación iniciada', users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} >
          <Route index element={<Stock />} />
          <Route path="/home/stock" element={<ProductSearch onProductFound={() => console.log('searched')} />} />
          <Route path="/home/stock/:searchtext" element={<ProductSearch onProductFound={() => console.log('searched')} />} />
          <Route path="/home/Sales" element={<Sales />} />
          <Route path="/home/Users" element={<UserManagement />} />
          <Route path='/home/payment' element={<PaymentPage />} />
          <Route path='/home/Settings' element={<Settings />} />
          <Route path='/home/Products' element={<ListProd />} />
          <Route path='/home/Discount' element={<DiscountManagementScreen />} />
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
