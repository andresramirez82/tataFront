import React, { useEffect, useState } from 'react';
import { ProductClass } from '@functions/api';
import { Product } from '@models/models';
import { Alert, Button, Form, InputGroup, Row, Col, Container } from 'react-bootstrap';
import { formatDate } from '@functions/functios';
import Stock from "@components/helpper/Stock";
import EditProductForm from './EditProductForm';
import { toast } from 'react-toastify';
import Barcode from 'react-barcode';
import { Carousel } from 'react-bootstrap';
import DeleteProduct from "@components/product/DeleteProduct";

interface ProductDetailsProps {
    productId: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product.product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [quantityToAdd, setQuantityToAdd] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [images, setImages] = useState<string[]>();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const fetchedProduct = await ProductClass.getProductById(productId);
                setProduct(fetchedProduct);
                setError(null);
            } catch (error) {
                console.error('Error al obtener detalles del producto:', error);
                setError('Error al obtener detalles del producto');
            }
        };

        fetchProductDetails();
    }, [productId]);

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

    const handleAddStock = async () => {
        if (product && quantityToAdd > 0) {
            try {
                const updatedProduct = await ProductClass.addStock(productId, quantityToAdd);
                setProduct(updatedProduct);
                setQuantityToAdd(0);
                setError(null);
                const toastMessage =
                    quantityToAdd === 1
                        ? `Se agregó un producto correctamente al stock de ${updatedProduct.name}`
                        : `Se agregaron correctamente ${quantityToAdd} productos al stock de ${updatedProduct.name}`;
                toast(toastMessage);
            } catch (error) {
                console.error('Error al agregar stock:', error);
                toast('Hubo un error al actualizar el stock');
                setError('Error al agregar stock');
            }
        }
    };

    const handleRemoveStock = async () => {
        if (product && quantityToAdd > 0) {
            try {
                const updatedProduct = await ProductClass.removeStock(productId, quantityToAdd);
                setProduct(updatedProduct);
                setQuantityToAdd(0);
                const toastMessage =
                    quantityToAdd === 1
                        ? `Se disminuyó un producto correctamente al stock de ${updatedProduct.name}`
                        : `Se disminuyeron correctamente ${quantityToAdd} productos al stock de ${updatedProduct.name}`;
                toast(toastMessage);
                setError(null);
            } catch (error) {
                console.error('Error al quitar stock:', error);
                toast('Hubo un error al actualizar el stock');
                setError('Error al quitar stock');
            }
        }
    };

    const handleShowEditModal = () => {
        setShowEditModal(true);
    };

    const handleHideEditModal = () => {
        setShowEditModal(false);
    };

    const handleShowDeleteModal = () => {
        setShowDelete(true);
    };
    const handleShowDeleteModalClose = () => {
        setShowDelete(false);
    };
    
    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}

            {product && (
                <>
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
                            <Form.Label>
                                Stock {product.quantity} total: {isNaN(quantityToAdd) ? product.quantity : product.quantity + quantityToAdd}
                            </Form.Label>
                            <Stock currentStock={product.quantity} threshold={product.threshold} />
                            <InputGroup className="mb-3 gap-2">
                                <Form.Control
                                    type="number"
                                    placeholder="Cantidad"
                                    value={quantityToAdd}
                                    onChange={(e) => setQuantityToAdd(parseInt(e.target.value, 10))}
                                    min={0}
                                />
                                <div className="input-group-append d-flex gap-2">
                                    <Button variant="success" onClick={handleAddStock} className='col-6' >
                                        <i className="bi bi-cart-plus mr-2"></i> <br />Agregar
                                    </Button>
                                    <Button variant="danger" onClick={handleRemoveStock} className='col-6' >
                                        <i className="bi bi-cart-x mr-2"></i> <br />Quitar
                                    </Button>
                                </div>
                            </InputGroup>
                            <div className="d-flex gap-2">
                                <Button variant="primary" className='col-6' size="lg" onClick={handleShowEditModal}>
                                    <i className="bi bi-pencil mr-2"></i> Editar
                                </Button>
                                <Button variant="danger" className='col-6' size="lg" onClick={handleShowDeleteModal}>
                                    <i className='bi bi-trash mr-2'></i> Eliminar
                                </Button>
                            </div>


                            <EditProductForm show={showEditModal} onHide={handleHideEditModal} productId={productId} />
                            {product.id && <DeleteProduct name={product.name} show={showDelete} onHide={handleShowDeleteModalClose} productId={product?.id} />}

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

                </>
            )}

        </Container>
    );
};

export default ProductDetails;