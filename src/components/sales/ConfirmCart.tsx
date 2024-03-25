import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Cart  } from "models/models";
import { CartClass } from "functions/api";
import { createOrder } from "functions/mercadopago";

interface confSaleProps {
    idCart: number;
    onConfirmarVenta: (idCart: number, idPayment: number) => void;
}

const ConfirmarVentaModal: React.FC<confSaleProps> = ({onConfirmarVenta, idCart}) => {
  const [selectedFormaPago, setSelectedFormaPago] = useState('1');
  const [payments, setpayments] = useState<Cart.payment[]>([]);
  const [cart, setcart] = useState<Cart.cart>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Puedes hacer una llamada a la API para obtener las formas de pago aquí
    // y actualizar el estado formasDePago
    CartClass.getPayment().then( pays => {
        setpayments(pays);
    })
  }, []);

  useEffect(() => {
    CartClass.getCart(idCart).then( (mycart) => {
      setcart(mycart)
    })
  }, [idCart])
  

  const handleConfirmarVenta = () => {
    // Lógica para confirmar la venta con la forma de pago seleccionada
    onConfirmarVenta(idCart,Number(selectedFormaPago));
    handleClose();
  };

  useEffect(() => {
    if (selectedFormaPago==='5' && cart) {
      createOrder(cart.sales).then((result: any) => {
        console.log(result)        
      }).catch((err : any) => {
        console.error(err)
      });
      
    }
  }, [cart, selectedFormaPago])
  

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
            <Form.Group controlId="formasDePagoSelect">
              <Form.Label>Selecciona la forma de pago:</Form.Label>
              <Form.Control
                as="select"
                value={selectedFormaPago}
                onChange={(e) => setSelectedFormaPago(e.target.value)}
              >
                {payments.map((formaPago) => (
                  <option key={formaPago.id} value={formaPago.id}>
                    {formaPago.tipo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirmarVenta}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmarVentaModal;
