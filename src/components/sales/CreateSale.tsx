// src/components/product/EditProductForm.tsx
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Form, Container, Modal, Row, Col, Carousel, Alert } from 'react-bootstrap';
import { CartClass } from '../../functions/api';
import { Product, Sale } from '../../models/models';
import Stock from "../../components/helpper/Stock";
import { toast } from 'react-toastify';
import Barcode from 'react-barcode';
import { formatDate } from '../../functions/functios';



interface EditProductFormProps {
  show: boolean;
  onHide: () => void;
  product: Product.product;
  idCart: number;
}


const CreateSale: React.FC<EditProductFormProps> = ({ show, onHide, product, idCart }) => {
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [images, setImages] = useState<string[]>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newSale, setnewSale] = useState<Sale.saleCart>(
    {
      cartId: idCart,
      productId: 0,
      quantity: 1
    }
  );

  useEffect(() => {
    SetStates();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;


    if (form.checkValidity()) {
      setIsFormInvalid(false);
      Agregar();
    } else {
      // Si hay errores de validación, muestra los mensajes de error
      e.stopPropagation();
      setIsFormInvalid(true);
    }
    //form.classNameList.add('was-validated');
  };

  useEffect(() => {
    if (product) {
      const apiUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${product?.comment}&page_size=1&json=true`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Verificar si hay resultados
          if (data.products.length > 0) {

            const images: string[] = data.products
              .map((producto: { image_url: string }) => producto.image_url)
              .filter((image: string) => !!image);

            setImages(images);
          } else {
            console.log("Producto no encontrado");
            setImages([]);
          }
        })
        .catch(error => console.error("Error:", error))

    }
  }, [product]);

  const ChangeCantidad = (e: ChangeEvent<HTMLInputElement>) => {

    if (product.id) {
      setnewSale({ ...newSale, quantity: Number(e.currentTarget.value), productId: product.id });
    }

  }

  useEffect(() => {
    SetStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const SetStates = () => {
    if (product.id) {
      setnewSale({ ...newSale, productId: product.id });
    }
  }


  const Agregar = () => {
    if (product.id) {
      CartClass.addToCart(newSale).then(resp => {
        toast(resp.message);
        onHide();
        setnewSale({
          ...newSale, quantity: 1
        });

      }).catch(err => {
        toast('Hubo un error al agregar la venta');
        console.error(err)
      })
    }
  }
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-lg">
      <Container>
        <Modal.Header closeButton>
          <Modal.Title>Agregar venta ({product?.name})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Barcode value={product.barcode} />
              <h2>{product.name}</h2>
              <p>Barcode: {product.barcode}</p>
              <p>Precio: ${product.price}</p>
              <p>Costo: ${product.cost}</p>
              <p>Comentario: <i>{product.comment}</i></p>
              <p>Cantidad: {product.quantity} límite de unidades: {product.threshold}</p>
              {product.date && <p>Último movimiento: {formatDate(product.date)}</p>}
              <Form.Label>Agregar/Quitar Stock</Form.Label>
              <Stock currentStock={product.quantity} threshold={product.threshold} />
            </Col>
            <Col md={6}>
              <Carousel className="d-block w-100" style={{ height: '600px', overflow: 'hidden' }} fade slide>
                {images?.map((img, i) => (
                  <Carousel.Item key={i}>
                    <img className="d-block w-100" src={img} alt={`prodcuto-${i}`} style={{ objectFit: 'cover', height: '100%' }} />
                  </Carousel.Item>
                ))}

                {images?.length === 0 &&
                  <Carousel.Item key={'varios'}>
                    <img className="d-block w-100" style={{ objectFit: 'cover', height: '100%' }} src='https://i0.wp.com/get.witei.com/wp-content/uploads/2022/04/cartera-de-productos-ejemplos.jpg?fit=1200%2C675&ssl=1' alt='Productos varios' />
                  </Carousel.Item>}
              </Carousel>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={12}>
              <Form noValidate validated={isFormInvalid} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    {!product.kind && <Form.Group controlId="cantidad">
                      <Form.Label>cantidad</Form.Label>
                      <Form.Control
                        value={newSale.quantity}
                        type="number"
                        onChange={ChangeCantidad}
                        ref={inputRef}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese un número válido para la venta
                      </Form.Control.Feedback>
                    </Form.Group>}
                    {product.kind && <Form.Group controlId="cantidad">
                      <Form.Label>gramos</Form.Label>
                      <Form.Control
                        value={newSale.quantity}
                        ref={inputRef}
                        type="number"
                        onChange={ChangeCantidad}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese valor válido para la venta
                      </Form.Control.Feedback>
                    </Form.Group>}
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Alert>Quedan {product.quantity - newSale.quantity}</Alert>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Col>

          </Row>
        </Modal.Body>
      </Container>
    </Modal>)
}

export default CreateSale;