import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { ProductClass } from 'functions/api';
import { Product } from 'models/models';
import { toast } from 'react-toastify';

interface CreateProductFormProps {
  show: boolean;
  onHide: () => void;
  barcode: string;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ show, onHide, barcode }) => {
  const [productDetails, setProductDetails] = useState<Product.product>({
    barcode,
    name: '',
    price: 0,
    cost: 0,
    quantity: 0,
    threshold: 0,
    comment: '',
  });

  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const handleSaveChanges = async () => {
    try {
      // Ejemplo de cómo podrías crear un nuevo producto
      await ProductClass.createProduct({ ...productDetails, barcode });
      onHide(); // Cierra el modal después de guardar los cambios
      toast("Se ha grabado correctamente!");
    } catch (error) {
      console.error('Error al crear el producto:', error);
      toast("Error al crear el producto!");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsFormInvalid(false);
      handleSaveChanges();
    } else {
      // Si hay errores de validación, muestra los mensajes de error
      e.stopPropagation();
      setIsFormInvalid(true);
    }
    form.classList.add('was-validated');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate validated={isFormInvalid} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Producto ({barcode})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form.Group controlId="productName">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                value={productDetails.name}
                onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un nombre para el producto
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="productPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={productDetails.price}
                  onChange={(e) => setProductDetails({ ...productDetails, price: parseFloat(e.target.value) })}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese un precio válido
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="productCost">
                <Form.Label>Costo</Form.Label>
                <Form.Control
                  type="number"
                  value={productDetails.cost}
                  onChange={(e) => setProductDetails({ ...productDetails, cost: parseFloat(e.target.value) })}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese un costo válido
                </Form.Control.Feedback>
              </Form.Group>

            <Form.Group controlId="productQuantity">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={productDetails.quantity}
                  onChange={(e) => setProductDetails({ ...productDetails, quantity: parseInt(e.target.value, 10) })}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese una cantidad válida
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="productThreshold">
                <Form.Label>Límite de Unidades</Form.Label>
                <Form.Control
                  type="number"
                  value={productDetails.threshold}
                  onChange={(e) => setProductDetails({ ...productDetails, threshold: parseInt(e.target.value, 10) })}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese una cantidad válida
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="productComment">
                <Form.Label>Comentario</Form.Label>
                <Form.Control
                  as="textarea"
                  value={productDetails.comment}
                  onChange={(e) => setProductDetails({ ...productDetails, comment: e.target.value })}
                />
              </Form.Group>

            {/* Resto de los campos del formulario */}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type='submit'>
            Guardar Producto
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateProductForm;