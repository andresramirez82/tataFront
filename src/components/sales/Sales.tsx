import { useEffect, useState } from "react";
import { CartClass } from "functions/api";
import { Alert, Button, Form, InputGroup, Row, Col, Container } from 'react-bootstrap';
import { formatDate } from "functions/functios";
import { Cart } from "models/models";
import { Sale } from "models/sales";



const Sales: React.FC = () => {
    const [carts, setcarts] = useState<Cart.cart[]>()
    useEffect(() => {
        CartClass.getCartToday().then(cart => {
            setcarts(cart);
            console.table(cart);
        }).catch(err => {
            console.error(err);
        })
    }, [])


    const acumular = (sales: Sale[]) => {
        let Cantidad: number = 0;
        sales.forEach(sale => {
            const cantidad = sale.quantity * sale.product.price
            Cantidad += (cantidad)
        })
        return Cantidad;
    }


    return (<Container>
        <Row md={12}><Alert variant='dark'><h1>Ventas</h1></Alert></Row>
        <Row>
            <Col md={6}>a</Col>
            <Col md={6}>
                <div className="table-responsiv">
                    <table className="table">
                        <thead><tr>
                        <th>id</th>
                        <th>fecha</th>
                        <th>usuario</th>
                        <th>monto</th>
                        </tr>
                            
                        </thead>
                        <tbody>
                            {
                                carts && carts.map((c, i) => {
                                    return (
                                        <tr key={i}
                                        >
                                            <th scope="row">{c.id}</th><td>{formatDate(c.cartDate)}</td><td>{c.user.name}</td><td>${acumular(c.sales)}</td></tr>);
                                })}
                        </tbody>
                    </table>
                </div>

            </Col>
        </Row>
    </Container>);

}

export default Sales;