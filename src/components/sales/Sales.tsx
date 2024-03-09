import { useEffect, useState } from "react";
import { CartClass } from "functions/api";
import { Alert, Row, Col, Container, Button } from 'react-bootstrap';
import { formatDate, getUser } from "functions/functios";

import { acumular } from "functions/functios";
import MoneyFormatter from "components/helpper/Money";
import Cart from "components/sales/Cart";
import { withDiscount } from './../../models/models';




const Sales: React.FC = () => {
    const [carts, setcarts] = useState<withDiscount[]>();
    const [idCart, setidCart] = useState<number>();
    const [idUser] = useState<number>(getUser().id);

    useEffect(() => {
        CartClass.getCartToday().then(cart => {
            setcarts(cart);
        }).catch(err => {
            console.error(err);
        })
    }, [idCart])


    const addCart = () => {
        const newCart : any = {
            userId: idUser
        }
        CartClass.AddCart(newCart).then( nc => {
            setidCart(nc.cart.id);
        })
    }

    return (<Container>
        <Row md={12}><Alert variant='light '><h1>Ventas</h1></Alert></Row>
        <Row>
            <Col md={6}>
                {idCart === undefined && <div><Alert variant="warning">
                    <Row>
                        <Col md={6}>No hay ningún carrito asignado ¿ Desea crear uno ?</Col>
                        <Col md={6}><Button className="col-12" onClick={addCart}><p className="bi bi-cart-plus mr-2"></p> Agregar Carrito</Button></Col>
                    </Row>
                </Alert>
                </div>}
                {idCart && <Cart idCart={idCart} setidCart={setidCart}/>}
            </Col>
            <Col md={6}>
                <div className="table-responsive">
                    <table className="table">
                        <thead><tr>
                            <th>id</th>
                            <th>fecha</th>
                            <th>usuario</th>
                            <th>monto</th>
                        </tr>

                        </thead>
                        <tbody style={{overflow: 'auto'}}>
                            {
                                carts && carts.map((c, i) => {
                                    return (
                                        <tr key={i} className={c.id === idCart ? 'table-info' : ''}
                                        >
                                            <th scope="row">{c.id}</th><td>{formatDate(c.cartDate)}</td><td>{c.user.name}</td><td><MoneyFormatter amount={acumular(c.sales, c.discounts)} /></td></tr>);
                                })}
                        </tbody>
                    </table>
                </div>

            </Col>
        </Row>
    </Container>);

}

export default Sales;