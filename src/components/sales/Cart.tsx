import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Container, Row, Col, InputGroup, Form, Button, Modal, Table } from "react-bootstrap";
import { CartClass, ProductClass } from "functions/api";
import { Cart as CartModel, Product, Discount } from "models/models";
import { formatDate } from "functions/functios";
import { acumular } from "functions/functios";
import MoneyFormatter from "components/helpper/Money";
import { toast } from 'react-toastify';
import CreateSale from "./CreateSale";
import ConfirmCart from "./ConfirmCart";
import { carts } from "models/cart";
import Ticket from "components/helpper/Ticket";
import { PDFViewer, pdf, Document, Page, View } from '@react-pdf/renderer';
import Help from "./Help";
import { getMails, sendMailPdf } from "functions/customer";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

interface CartProps {
    idCart: number;
    setidCart: React.Dispatch<React.SetStateAction<number | undefined>>;
    addCart: () => void;
}

const Cart: React.FC<CartProps> = ({ idCart, setidCart, addCart }) => {
    const [cart, setcart] = useState<CartModel.cart>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isEditing, setEditing] = useState(true);
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [barCode, setbarCode] = useState<string>();
    const [Prod, setProd] = useState<Product.product>();
    const [showCreateSale, setshowCreateSale] = useState(false);
    const [cartTicket, setcartTicket] = useState<CartModel.cart>();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [discount, setdiscount] = useState<Discount.dicountsResponse[]>();
    const [finalizarBtn, setfinalizarBtn] = useState<boolean>(false);
    const [showHelp, setshowHelp] = useState(false);
    const [mail, setmail] = useState<string>('');
    const [mailslist, setmailslist] = useState<{ id: number, mail: string }[]>([]);

    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    useEffect(() => {
        const fetchMails = async () => {
            try {
                const mails = await getMails();
                setmailslist(mails);
            } catch (error) {
                console.error("Error fetching mails:", error);
            }
        };

        fetchMails();
    }, []);
    

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        Actualizar(idCart);
    }, [idCart]);

    const confirmSaleClose = () => {
        setcart(undefined);
        Actualizar(idCart);
        setfinalizarBtn(false);
    };

    const Actualizar = (idCartParam: number) => {
        if (idCartParam) {
            CartClass.getCart(idCartParam)
                .then(myCart => {
                    if (myCart) {
                        setcart(myCart);
                        setEditing(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
            CartClass.discountsForCart(idCartParam).then(dis => {
                setdiscount(dis);
            }).catch(err => {
                console.log(err);
            });
        }
    };

    const BuscarProd = (barcode: string) => {
        ProductClass.getProductByBarcode(barcode).then(resp => {
            if (resp.length > 1) {
                toast(`Hay ${resp.length} productos que coinciden con la búsqueda se más específico`);
            } else {
                setProd(resp[0]);
            }
        }).catch(err => {
            console.error(err);
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            setIsFormInvalid(false);
            if (barCode)
                BuscarProd(barCode);
            setshowCreateSale(true);
        } else {
            e.stopPropagation();
            setIsFormInvalid(true);
        }
        form.classList.add('was-validated');
    };

    const onConfirmarVenta = (idCart: number, idPayment: number) => [
        CartClass.updateCart(idCart, idPayment, discount).then(resp => {
            setfinalizarBtn(false);
        }).catch(err => {
            console.error(err);
        })
    ];

    const handleHideModalSale = () => {
        setshowCreateSale(false);
        if (idCart) {
            CartClass.getCart(idCart)
                .then(myCart => {
                    if (myCart) {
                        setcart(myCart);
                        Actualizar(idCart);
                        setEditing(true);
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        }
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const CerrarModal = () => {
        setidCart(undefined);
        setcartTicket(undefined);
        addCart();
    };

    const DeleteCart = () => {
        CartClass.deleteCart(idCart).then(resp => {
            toast(`Se borró correctamente el carrito ${idCart}`);
            setidCart(undefined);
        }).catch(err => {
            toast(`Hubo un error al eliminar la venta ${idCart}`);
        });
    };

    const BorraSale = (idSale: number) => {
        CartClass.deleteSale(idSale).then(sale => {
            toast(`Se borró correctamente la venta`);
            Actualizar(idCart);
        }).catch(err => {
            toast(`Error al borrar`);
        });
    };

    const mostarTicket = (cart: carts) => {
        setcartTicket(cart);
    };

    /**
     * Hot´s keys Handler
     */
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === ' ') {
                setfinalizarBtn(true);
            }
            if (event.key === 'F4') {
                handleShowDeleteModal();
            }
            if (event.key === 'F1') {
                setshowHelp(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const MyDoc = (
        <Document>
            <Page>
                <View>
                    Texto
                </View>
            </Page>
        </Document>
    );

    const ticket = cartTicket ? <Ticket cart={cartTicket} /> : MyDoc;

    const EnviarMail = async () => {
        if (cartTicket) {
            try {
                const blob = await pdf(ticket).toBlob();
                const formData = new FormData();
                formData.append('to', mail);
                formData.append('text', `Se adjunta su comprobante de venta Nro ${cart?.id} <br/> Vendedor: <b>${cart?.user.name}</b>`);
                formData.append('subject', `Comprobante Nro: ${cart?.id}`);
                formData.append('file', blob, `ComprobanteNro:${cart?.id}.pdf`);

                if (mail === '') {
                    toast.error(`Debe completar un mail`);
                } else {
                    const response = await sendMailPdf(formData);
                    toast.success(response.message);
                }
            } catch (error) {
                console.error('Error al enviar el correo:', error);
            }
        }
    };

    return (
        <Container>
            <Help show={showHelp} onClose={() => setshowHelp(false)} />
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este carrito?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => { DeleteCart(); handleCloseDeleteModal(); }}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table>
                <tbody>
                    <tr>
                        <td><span className="bi-cart"></span> {cart?.id}</td>
                        <td><span className="bi-calendar"></span> {cart && formatDate(cart?.cartDate)}</td>
                    </tr>
                    <tr>
                        <td><i className="bi bi-person"></i> {cart?.user.name}</td>
                        <td>{cart && <h4><MoneyFormatter amount={acumular(cart.sales, discount)} /></h4>}</td>
                    </tr>
                </tbody>
            </Table>
            <div className='row gap-3'>
                {!cartTicket && <>
                    <Row>
                        <div className="input-group-append d-flex gap-1">
                            <Button variant="danger" className='col-6' onClick={handleShowDeleteModal}>
                                <i className="bi bi-cart-x mr-2"></i> <br />Cancelar
                            </Button>
                            {cart && <ConfirmCart idCart={cart?.id} onConfirmarVenta={onConfirmarVenta} totalSales={acumular(cart.sales, discount)} handleCloseParent={confirmSaleClose} mostarTicket={mostarTicket} finalizar={finalizarBtn} />}
                        </div>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form noValidate validated={isFormInvalid} onSubmit={handleSubmit}>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text"
                                        ref={inputRef}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setbarCode(e.currentTarget.value)}
                                        required autoFocus />
                                    <InputGroup.Text id="basic-addon2"><span className="bi-upc-scan"></span></InputGroup.Text>
                                </InputGroup>
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un codigo de barras
                                </Form.Control.Feedback>
                            </Form>
                        </Col>
                    </Row>
                </>}
                {cartTicket && <>
                    <form onSubmit={CerrarModal}>
                        <Row md={12}>
                            <Form.Group className="mb-3" controlId="mailforTicket">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Typeahead
                                    id="mail-typeahead"
                                    onChange={(selected: any) => {
                                        if (selected.length > 0) {
                                            setmail(selected[0].mail);
                                        }
                                    }}
                                    options={mailslist}
                                    labelKey="mail"
                                    placeholder="nombre@gmail.com"
                                />
                                
                            </Form.Group>
                        </Row>
                        <Row md={12} className="gap-6">
                            <Button variant="success" className='col-6' onClick={EnviarMail} autoFocus >
                                <i className="bi bi-cart-x mr-2"></i> <br />Enviar Mail
                            </Button>
                            <Button variant="danger" className='col-6' onClick={CerrarModal} autoFocus >
                                <i className="bi bi-cart-x mr-2"></i> <br />Cerrar
                            </Button>
                        </Row>
                    </form>
                </>}
                {cartTicket && <PDFViewer width="1000" height="600">
                    <Ticket cart={cartTicket} />
                </PDFViewer>}
                {!cartTicket && <Row>
                    <div className="table-responsive">
                        <Table striped hover bordered>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Total</th>
                                    <th>Fecha</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.sales && cart.sales.map((sale, i) => {
                                    return (<tr key={`salesporcart${i}`}>
                                        <th scope="row"><i className="bi bi-bag"></i> {sale.id}</th><td>{sale.product.name}</td><td><MoneyFormatter amount={sale.product.price} /></td>{sale.product.kind ? <td>{sale.quantity} g</td> : <td>{sale.quantity}</td>}<td><MoneyFormatter amount={sale.totalPrice} /></td><td>{formatDate(sale.saleDate)}</td><td><Button variant="danger" onClick={() => BorraSale(sale.id)}><i className="bi bi-cart-x mr-2"></i></Button></td>
                                    </tr>);
                                })}
                            </tbody>
                            <tbody>
                                {discount && discount.map((dis, i) => {
                                    return (<tr key={`discount${i}`}>
                                        <th scope="row" colSpan={2}><i className="bi bi-percent"></i> {dis.discountName}</th>
                                        <th scope="row" colSpan={2}>Descuento en {dis.productName}</th>
                                        <td colSpan={3}><MoneyFormatter amount={dis.discount} /></td>
                                    </tr>);
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Row>}
            </div>
            {Prod && <CreateSale product={Prod} show={showCreateSale} onHide={handleHideModalSale} idCart={idCart} />}
        </Container>
    );
};

export default Cart;
