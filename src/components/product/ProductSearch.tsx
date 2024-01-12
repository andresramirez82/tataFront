import React, { useState,useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { ProductClass } from 'functions/api';
import { Product } from 'models/models';
import ProductDetails from 'components/product/ProductDetails';
import CreateProductForm from './CreateProductForm';
import { useParams } from 'react-router-dom';

interface ProductSearchProps {
  onProductFound: (product: Product.product) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onProductFound }) => {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product.product[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { searchtext } = useParams();


  const handleFocus = () => {
    setSelectedProductId(null);
    setProducts(undefined);
    setError(null);
  };

  const handleHideCreateModal = () => {
    setShowCreateModal(false);
  };

  useEffect(() => {
    if (searchtext) {
      const decodedText = decodeURIComponent(searchtext);
      setBarcode(decodedText);
      handleSearch();
    }
    

   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchtext])
  
  

  const handleSearch = async () => {
    setSelectedProductId(null);
    setProducts(undefined);
    setError(null);
    setLoading(true);

    try {
      const product = await ProductClass.getProductByBarcode(barcode);

      if (product.length > 0) {
        onProductFound(product[0]);
        setProducts(product);

        if (product.length === 1) {
          setSelectedProductId(Number(product[0].id));
        }
      } else {
        setError('Producto no encontrado');
        setSelectedProductId(null);
      }
    } catch (error) {
      console.error('Error al buscar el producto:', error);
      setError('Error al buscar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsFormInvalid(false);
      handleSearch();
    } else {
      // Si hay errores de validación, muestra los mensajes de error
      e.stopPropagation();
      setIsFormInvalid(true);
    }
    form.classList.add('was-validated');
  };

  return (
    <div>
      <Form noValidate validated={isFormInvalid} onSubmit={handleSubmit}>
        <Form.Group controlId="productBarcodeSearch" >
          <Form.Label>Código de Barras</Form.Label>
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Ingrese el código de barras"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onFocus={handleFocus}

              required
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un dato para buscar
            </Form.Control.Feedback>
            <Button variant="primary" onClick={handleSearch} disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Buscar Producto'}
            </Button>
          </div>

        </Form.Group>

      </Form>


      <ul className="list-group">
        {products &&
          products?.length > 1 &&
          products.map((p, i) => (
            <li
              key={i}
              className="list-group-item"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedProductId(Number(p.id))}
            >
              {p.name} - ${p.price} - {p.comment}
            </li>
          ))}
      </ul>

      {products && products?.length > 1 && (
        <>
          <hr />
          <Alert variant='success'> Se encontraron <b>{products?.length} productos </b>que coinciden con la búsqueda. Haz clic en uno para utilizar.</Alert>
          
        </>
      )}

      {selectedProductId && (
        <>
          <hr />
          <ProductDetails productId={selectedProductId} />
        </>
      )}

      {error && (
        <>
          <hr />
          <Alert variant="danger" className="mt-3">
            {error} <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Crear
            </Button>
          </Alert>

        </>
      )}
      <CreateProductForm show={showCreateModal} barcode={barcode} onHide={handleHideCreateModal} />
    </div>
  );
};

export default ProductSearch;