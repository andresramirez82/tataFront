import { useEffect, useState } from "react";
import { CartClass } from "../../functions/api";
import { Alert, Row, Col, Container, Button, Table } from 'react-bootstrap';
import { formatDate, getUser, formatDateWithoutHours } from "../../functions/functios";
import { acumular } from "../../functions/functios";
import MoneyFormatter from "../..//components/helpper/Money";
import Cart from "../../components/sales/Cart";
import { withDiscount } from './../../models/models';
import { Cart as CartModel } from '../../models/models';
import TicketModal from "./TicketModal";



const Sales: React.FC = () => {
    const [carts, setcarts] = useState<withDiscount[]>();
    const [totalGeneral, setTotalGeneral] = useState<number>(0);
    const [idCart, setidCart] = useState<number>();
    const [idUser, setidUser] = useState<number>();
    const [showTicket, setshowTicket] = useState<boolean>(false);
    const [cartv, setcartv] = useState<CartModel.cart>();


    useEffect(() => {
        getUser().then(user => {
            setidUser(user.id);
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

    const verTicket = (cart: CartModel.cart) => {
        setcartv(cart);
        setshowTicket(true);
    }

    const CloseTicket = () => {
        setcartv(undefined);
        setshowTicket(false);
    }

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
        {showTicket && cartv && <TicketModal cart={cartv} onClose={CloseTicket} show={showTicket} />}
        <Row md={12}>
            <h2><span className="bi bi-cart" /> Ventas</h2>
        </Row>
        <Row>
            <Col md={6}>
                {idCart === undefined && <div><Alert variant="warning">
                    <Row>
                        <Col md={6}>No hay ningún carrito asignado ¿ Desea crear uno ?</Col>
                        <Col md={6}><Button className="col-12" onClick={addCart}><p className="bi bi-cart-plus mr-2"></p> Agregar Carrito</Button></Col>
                    </Row>
                </Alert>
                </div>}
                {idCart && <Cart idCart={idCart} setidCart={setidCart} addCart={addCart}/>}
            </Col>
            <Col md={6}>
                <Table>
                    <tbody>
                        <tr>
                            <th><i className="bi bi-cash-coin"></i> Total Diario </th>
                            <th><span className="bi-calendar"></span> ( {hoy()} )</th>
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
                            <th></th>
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
                                            <td><MoneyFormatter amount={acumular(c.sales, c.discountsApplied)}></MoneyFormatter></td>
                                            <td><span className="btn btn-success bi bi-ticket" title='ver Ticket' onClick={() => verTicket(c)}> Ticket</span></td>
                                        </tr>);
                                })}
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    </Container>);

}

export default Sales;