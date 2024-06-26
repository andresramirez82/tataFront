import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { Cart } from "@models/models";
import { pay } from "@models/Pay";
import { CartClass } from "@functions/api";
import { createOrder } from "@functions/mercadopago";
import MP from "../../img/mp.png";
import AFIP from "../../img/afip.png";
import MoneyFormatter from '@components/helpper/Money';
import Spinner from "@components/helpper/Spinner";
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { getOrder } from "@functions/mercadopago";
import { carts } from '@models/cart';
import { keyboardKey } from "@testing-library/user-event";
import { createPay } from '@functions/pay';
import { config } from "../../config/config";


interface confSaleProps {
  idCart: number;
  onConfirmarVenta: (idCart: number, idPayment: number) => void;
  totalSales: number;
  handleCloseParent: () => void;
  mostarTicket: (cart: carts) => void;
  finalizar: boolean;
}

const ConfirmarVentaModal: React.FC<confSaleProps> = ({ onConfirmarVenta, idCart, totalSales, handleCloseParent, mostarTicket, finalizar }) => {
  const [selectedFormaPago, setSelectedFormaPago] = useState('1');
  const [payments, setpayments] = useState<Cart.payment[]>([]);
  const [cart, setcart] = useState<Cart.cart>();
  const [show, setShow] = useState(false);
  const [sendMP, setsendMP] = useState<boolean>(false);
  const [sendAFIP, setsendAFIP] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string>('Esperando la respuesta de Mercado Pago');
  const [mixP, setmixP] = useState<pay[]>([]);
  const [total, settotal] = useState<number>(0)


  useEffect(() => {
    if (finalizar) {
      handleShow();
    }
  }, [finalizar])


  const handleClose = () => {
    handleCloseParent();
    setShow(false);
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Puedes hacer una llamada a la API para obtener las formas de pago aquí
    // y actualizar el estado formasDePago
    CartClass.getPayment().then(pays => {
      setpayments(pays);
    })
  }, []);

  useEffect(() => {
    CartClass.getCart(idCart).then((mycart) => {
      setcart(mycart)

    })
  }, [idCart])

  useEffect(() => {
    const socket = io(config.urlAPI2);
    socket.on('notification', (notification) => {
      // console.log(notification)
      if (notification) {
        if (notification.topic === 'merchant_order') {
          setNotifications('Procesando pago');
        }
        if (notification.action === 'payment.created') {
          toast(`Pago realizado`);
          getOrder(idCart).then(() => {
            onConfirmarVenta(idCart, Number(selectedFormaPago));
            handleClose();
            if (cart) {
              mostarTicket(cart);
            }
          })

        }
      }

    });

    return () => {
      socket.off('notification');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const agregarPay = (p: pay) => {
    createPay(p);
  }




  const handleConfirmarVenta = () => {
    // Lógica para confirmar la venta con la forma de pago seleccionada
    if (sendMP && cart && selectedFormaPago === '2') {
      setloading(true);
      createOrder(cart, totalSales).then(() => {
        // console.log(result)
      }).catch((err: unknown) => {
        console.error(err)
      })
    }
    if (selectedFormaPago !== '4' && !sendMP) {
      onConfirmarVenta(idCart, Number(selectedFormaPago));
      handleClose();
      if (cart) {
        mostarTicket(cart);
      }
    }

    if (selectedFormaPago === '4' && cart) {
      if (total === totalSales) {
        mixP.forEach(p => {
          if (p.amount !== 0) {
            if (p.payment === 2 && sendMP) {
              createOrder(cart, p.amount).then(() => {
                agregarPay(p);
              }).catch((err: unknown) => {
                console.error(err)
              })
            } else {
              agregarPay(p)
            }
          }
        }
        )
        onConfirmarVenta(idCart, Number(selectedFormaPago));
        handleClose();
        if (cart) {
          mostarTicket(cart);
        }
      } else {
        toast(`No coinciden los valores de los pagos faltan $ ${total-totalSales}`)
      }
      
    }

  };

  const selectOnKeyPressHandler = (e: keyboardKey) => {
    if (e.key === 'c') {
      handleConfirmarVenta();
    }
  }


  const changePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFormaPago(e.target.value);
    setsendMP(false);
    setsendAFIP(false);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (cart) {
      const newPay: pay = {
        amount: Number(e.currentTarget.value),
        cart: idCart,
        payment: Number([e.currentTarget.name]),
        id: 0
      };
      const Array: pay[] = [];
      mixP.forEach(r => {
        if (r.payment !== Number([e.currentTarget.name])) {
          Array.push(r)
        }
      })
      Array.push(newPay);
      setmixP(Array);
      let total = 0;

      if (Array.length > 0) {
        Array.forEach(r => {
          total = r.amount + total;
        })
        settotal(total);
      }
    }
  }

  useEffect(() => {
    TotalParcial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixP])


  const TotalParcial = () => {
    let total = 0;

    if (mixP.length > 0) {
      mixP.forEach(r => {
        total = r.amount + total;
      })
      settotal(total);
    }
  }

  // region JSX
  return (
    <>
      <Button variant="success" className='col-6' onClick={handleShow}>
        <i className="bi bi-cart-plus mr-2"></i> <br />Finalizar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              {!loading && <><Col md={6}><Form.Group controlId="formasDePagoSelect">
                <h4>Total: <MoneyFormatter amount={totalSales} /></h4>
                <Form.Label>Selecciona la forma de pago: </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedFormaPago}
                  onChange={changePayment}
                  onKeyDown={selectOnKeyPressHandler}
                  autoFocus
                >
                  {payments.map((formaPago) => (
                    <option key={formaPago.id} value={formaPago.id}>
                      {formaPago.tipo}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              </Col><Col md={6}>
                  <Form.Check type='checkbox' id={`check-api`}>
                    <Form.Check.Input type='checkbox' disabled={selectedFormaPago !== '2' ? true : false} checked={sendMP} onChange={(e) => setsendMP(e.currentTarget.checked)} />
                    <Form.Check.Label>
                      <Image src={MP} alt="MP Logo" style={{ width: '32px', height: '32px' }} /> Enviar a QR de  Merdado pago
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Check type='checkbox' id={`check-api`}>
                    <Form.Check.Input type='checkbox' checked={sendAFIP} onChange={(e) => setsendAFIP(e.currentTarget.checked)} />
                    <Form.Check.Label>
                      <Image src={AFIP} alt="MP Logo" style={{ width: '32px', height: '32px' }} /> Facturar
                    </Form.Check.Label>
                  </Form.Check>
                </Col></>}
            </Row>
            <Row className="justify-content-center align-items-center" >
              <Col>
                {loading && (
                  <div className="text-center">
                    <h5>{notifications}</h5>
                    <Image src={MP} alt="MP Logo" style={{ width: '64px', height: '64px' }} />
                    <br />
                    {notifications}
                    <Spinner />
                  </div>
                )}
              </Col>
            </Row>
            {selectedFormaPago === '4' &&
              <Row>
                <Col>
                  {payments.map((f, i) => {
                    if (f.id !== 4) {
                      return (
                        <Row key={`rows${i}`}>
                          <Form.Group controlId={`formasDePagoInput${f.id}`}>
                            <Form.Label>{f.tipo}</Form.Label>
                            <Form.Control
                              type='number'
                              onChange={onChange}
                              name={f.id?.toString()}
                            >
                            </Form.Control>
                          </Form.Group>
                        </Row>
                      );
                    }
                  })}
                  <Row>
                    Total : <MoneyFormatter amount={total}/>
                  </Row>
                </Col>
              </Row>}

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmarVenta} disabled={loading}>
            <u>C</u>onfirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmarVentaModal;
