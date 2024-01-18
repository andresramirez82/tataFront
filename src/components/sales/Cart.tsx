import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Container, Row, Col, Alert, Form } from "react-bootstrap";
import { CartClass, ProductClass } from "functions/api";
import { Cart as CartModel, Product } from "models/models";
import { formatDate } from "functions/functios";
import { acumular } from "functions/functios";
import MoneyFormatter from "components/helpper/Money";
import { toast } from 'react-toastify';
import CreateSale from "./CreateSale";

interface CartProps {
    idCart: number;
}

const Cart: React.FC<CartProps> = ({ idCart }) => {
    const [cart, setcart] = useState<CartModel.cart>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isEditing, setEditing] = useState(true);
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [barCode, setbarCode] = useState<string>();
    const [Prod, setProd] = useState<Product.product>();
    const [showCreateSale, setshowCreateSale] = useState(false);



    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);


    useEffect(() => {
        if (idCart) {
            CartClass.getCart(idCart)
                .then(myCart => {
                    if (myCart) {
                        setcart(myCart);
                        setEditing(true);
                    }

                })
                .catch(err => {
                    console.error(err);
                })
        }
    }, [idCart])

    const BuscarProd = (barcode: string) => {
        ProductClass.getProductByBarcode(barcode).then(resp => {
            if (resp.length > 1) {
                toast(`Hay ${resp.length} productos que coinciden con la búsqueda se más específico`);
            } else {
                // seguir acá
                setProd(resp[0]);
            }
        }).catch(err => {
            console.error(err)
        })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            setIsFormInvalid(false);
            if (barCode)
                BuscarProd(barCode);
            setshowCreateSale(true);
        } else {
            // Si hay errores de validación, muestra los mensajes de error
            e.stopPropagation();
            setIsFormInvalid(true);
        }
        form.classList.add('was-validated');

    }

    const handleHideModalSale = () => {
        setshowCreateSale(false);
        if (idCart) {
            CartClass.getCart(idCart)
                .then(myCart => {
                    if (myCart) {
                        setcart(myCart);
                        setEditing(true);
                    }

                })
                .catch(err => {
                    console.error(err);
                })
        }
        if (inputRef.current) {
            inputRef.current.value = ''; // No error
        }
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Alert variant="success ">{cart?.id}</Alert>
                </Col>
                <Col md={6}>
                    {cart && <Alert variant="success ">{formatDate(cart?.cartDate)}</Alert>}

                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Alert variant="success ">{cart?.user.name}</Alert>
                </Col>
                <Col md={6}>
                    {cart && <Alert variant="success "><MoneyFormatter amount={acumular(cart.sales)} /></Alert>}

                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Form noValidate validated={isFormInvalid} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Control type="text"
                                ref={inputRef}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setbarCode(e.currentTarget.value)}
                                required />
                        </Form.Group>
                        <Form.Control.Feedback type="invalid">
                            Por favor ingrese un codigo de barras
                        </Form.Control.Feedback>
                    </Form>
                </Col>
            </Row>
            <Row>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>producto</th>
                                <th>precio</th>
                                <th>total</th>
                                <th>fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.sales && cart.sales.map((sale, i) => {
                                return (<tr key={`salesporcart${i}`}>
                                    <th scope="row">{sale.id}</th><td>{sale.product.name}</td><td>{sale.product.price}</td><td>{sale.totalPrice}</td><td>{formatDate(sale.saleDate)}</td>
                                </tr>);
                            })}
                        </tbody>
                    </table>
                </div>

            </Row>
            {Prod && <CreateSale product={Prod} show={showCreateSale} onHide={handleHideModalSale} idCart={idCart} />}
        </Container>);
}

export default Cart;