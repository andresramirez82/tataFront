import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Alert, Form} from "react-bootstrap";
import { CartClass } from "functions/api";
import { Cart as CartModel } from "models/models";
import { formatDate } from "functions/functios";
import { acumular } from "functions/functios";
import MoneyFormatter from "components/helpper/Money";

interface CartProps {
    idCart: number;
}

const Cart: React.FC<CartProps> = ({ idCart }) => {
    const [cart, setcart] = useState<CartModel.cart>();
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isEditing, setEditing] = useState(true);

    const toggleEditing = () => {
        setEditing(!isEditing);
      };

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


    const handleSubmit = () => {

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
                            <Form.Control type="number"
                                ref={inputRef}
                                
                                required />
                        </Form.Group>
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

        </Container>);
}

export default Cart;