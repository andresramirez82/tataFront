// src/components/product/EditProductForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, ButtonGroup } from 'react-bootstrap';
import { ProductClass, TagClass } from 'functions/api';
import { Product } from 'models/models';
import { Tag } from 'models/products';
import { toast } from 'react-toastify';
import TagSearch from "components/helpper/Tag";
import ProductDetails from './ProductDetails';

interface EditProductFormProps {
  show: boolean;
  onHide: () => void;
  productId: number;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ show, onHide, productId }) => {
  const [productDetails, setProductDetails] = useState<Product.product | null>(null);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [existingTags, setExistingTags] = useState<number[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const fetchedProduct = await ProductClass.getProductById(productId);
        setProductDetails(fetchedProduct);
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    };

    if (show) {
      fetchProductDetails();
    }
  }, [show, productId]);


  const handleAddTag = (tags: Tag[]) => {
    const TagsToAdd: Tag[] = [];
    tags.forEach(async t => {
      if (t.customOption) {
        const tagToAdd: Tag = {
          id: 0,
          name: t.name
        };
        const newTagAdded = await TagClass.addTags(tagToAdd);
        TagsToAdd.push(newTagAdded);
      } else {
        TagsToAdd.push(t)
      }
    })
    // const tagIds = tags.map(tag => tag.id);
    // setExistingTags(prevTags => [...prevTags, ...TagsToAdd]);
    if (productDetails) {
      setProductDetails({ ...productDetails, tags: TagsToAdd });
    }
  };

  const handleSaveChanges = async () => {
    // Agregar lógica para guardar los cambios en la API
    if (productDetails) {
      try {
        // Ejemplo de cómo podrías guardar los cambios
        await ProductClass.updateProduct(productId, productDetails);
        toast('Se ha editado correctamente');
        onHide(); // Cierra el modal después de guardar los cambios
      } catch (error) {
        console.error('Error al guardar cambios:', error);
        toast('Error al guardar cambios');
      }
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
          <Modal.Title>Editar Producto ({productDetails?.barcode})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productDetails && (
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
              <Form.Group controlId='productKind'>
                <Form.Label>Venta por unidades o por granel</Form.Label>
                <ButtonGroup size="lg" className="mb-2" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant={!productDetails.kind ? 'primary' : 'secondary'}
                    onClick={() => setProductDetails({ ...productDetails, kind: false })}
                  >
                    Unidades
                  </Button>
                  <Button
                    variant={productDetails.kind ? 'primary' : 'secondary'}
                    onClick={() => setProductDetails({ ...productDetails, kind: true })}
                  >
                    Por granel
                  </Button>
                </ButtonGroup>
              </Form.Group>
              <Form.Group>
                {productDetails.tags && <TagSearch existingTags={productDetails?.tags} onAddTag={handleAddTag} />}
              </Form.Group>
            </>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type='submit'>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProductForm;