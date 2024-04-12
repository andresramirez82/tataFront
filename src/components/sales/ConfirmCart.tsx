/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Image, Row, Col } from 'react-bootstrap';
import { Cart } from "models/models";
import { CartClass } from "functions/api";
import { createOrder } from "functions/mercadopago";
import MP from "img/mp.png";
import AFIP from "img/afip.png";
import MoneyFormatter from 'components/helpper/Money';
import Spinner from "components/helpper/Spinner";


interface confSaleProps {
  idCart: number;
  onConfirmarVenta: (idCart: number, idPayment: number) => void;
  totalSales: number;
}

const ConfirmarVentaModal: React.FC<confSaleProps> = ({ onConfirmarVenta, idCart, totalSales }) => {
  const [selectedFormaPago, setSelectedFormaPago] = useState('1');
  const [payments, setpayments] = useState<Cart.payment[]>([]);
  const [cart, setcart] = useState<Cart.cart>();
  const [show, setShow] = useState(false);
  const [sendMP, setsendMP] = useState<boolean>(false);
  const [sendAFIP, setsendAFIP] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);

  const handleClose = () => setShow(false);
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


  const handleConfirmarVenta = () => {
    // Lógica para confirmar la venta con la forma de pago seleccionada
    if (sendMP && cart) {
      setloading(true);
      createOrder(cart, totalSales).then((result: any) => {
        console.log(result);
        onConfirmarVenta(idCart, Number(selectedFormaPago));
      }).catch((err: any) => {
        console.error(err)
      }).finally(() => {
        setloading(false);
        handleClose();
      })
    }
    else {
      onConfirmarVenta(idCart, Number(selectedFormaPago));
      handleClose();
    }
    
  };


  const changePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFormaPago(e.target.value);
    setsendMP(false);
    setsendAFIP(false);
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
                    <Form.Check.Input type='checkbox' disabled={selectedFormaPago !== '5' ? true : false} checked={sendMP} onChange={(e) => setsendMP(e.currentTarget.checked)} />
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
                    <h5>Esperando la respuesta de Mercado Pago</h5>
                    <Image src={MP} alt="MP Logo" style={{ width: '64px', height: '64px' }} />
                    <br />
                    <Spinner />
                  </div>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmarVenta} disabled={loading}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmarVentaModal;
