import { useEffect, useState } from "react";
import { CartClass } from "functions/api";
import { Alert, Row, Col, Container, Button, Table } from 'react-bootstrap';
import { formatDate, getUser, formatDateWithoutHours } from "functions/functios";
import { acumular } from "functions/functios";
import MoneyFormatter from "components/helpper/Money";
import Cart from "components/sales/Cart";
import { withDiscount } from './../../models/models';




const Sales: React.FC = () => {
    const [carts, setcarts] = useState<withDiscount[]>();
    const [totalGeneral, setTotalGeneral] = useState<number>(0);
    const [idCart, setidCart] = useState<number>();
    const [idUser, setidUser] = useState<number>();


    useEffect(() => {
        getUser().then( user => {
            setidUser( user.id );
        })
        CartClass.getOpenCart().then(open => {
            setidCart(open.id);
        }).catch(err => {
            console.error(err);
        })
    }, [])


    useEffect(() => {
        CartClass.getCartToday().then(cart => {
            setcarts(cart);
            const total = cart.reduce((accumulator, currentValue) => {
                return accumulator + acumular(currentValue.sales, currentValue.discountsApplied);
            }, 0);
            setTotalGeneral(total);
        }).catch(err => {
            console.error(err);
        })
    }, [idCart])


    const addCart = () => {
        const newCart: any = {
            userId: idUser
        }
        CartClass.AddCart(newCart).then(nc => {
            setidCart(nc.cart.id);
        })
    }

    const hoy = () => {
        const now = new Date();
        return formatDateWithoutHours(now);
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
                {idCart && <Cart idCart={idCart} setidCart={setidCart} />}
            </Col>
            <Col md={6}>
                <Table>
                    <tbody>
                        <tr>
                            <th><i className="bi bi-cash-coin"></i>Total Diario </th>
                            <th><span className="bi-calendar"></span>( {hoy()} )</th>
                            <td><h4><MoneyFormatter amount={totalGeneral} /></h4></td>
                        </tr>
                    </tbody>

                </Table>

                <div></div>
                <div className="table-responsive">
                    <Table hover striped bordered>
                        <thead><tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Pago</th>
                            <th>Usuario</th>
                            <th>Monto</th>
                        </tr>

                        </thead>
                        <tbody style={{ overflow: 'auto' }}>
                            {
                                carts && carts.map((c, i) => {
                                    return (
                                        <tr key={i} className={c.id === idCart ? 'table-info' : ''}
                                        >
                                            <th scope="row"><span className="bi-cart"></span> {c.id}</th><td>{formatDate(c.cartDate)}</td>
                                            <td>{c.payment.tipo}</td>
                                            <td>{c.user.name}</td><td><MoneyFormatter amount={totalGeneral} /></td></tr>);
                                })}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    </Container>);

}

export default Sales;