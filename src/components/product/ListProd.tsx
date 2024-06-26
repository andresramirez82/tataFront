import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditProductForm from './EditProductForm';
import { formatDate } from "../../functions/functios";
import DeleteProduct from "../../components/product/DeleteProduct";
import { fetchProductsAPI } from "../../functions/product";
import { products } from "../../models/products";


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<products[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        nextPage: null as number | null,
        prevPage: null as number | null,
    });
    const [order, setorder] = useState<string>('id');
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectProd, setselectProd] = useState<number>();
    const [selectProdName, setselectProdName] = useState<string>();

    const Edit = (id: number) => {
        setShowEditModal(true);
        setselectProd(id);
    }

    const handleHideEditModal = () => {
        setShowEditModal(false);
        fetchProducts(pagination.currentPage);
    };

    useEffect(() => {
        fetchProducts(pagination.currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.currentPage]);

    const fetchProducts = async (page: number) => {
        try {
            // const response = await fetch(`http://localhost:5000/products?page=${pagination.currentPage}&sort=${order}`);
            const response = fetchProductsAPI(pagination.currentPage, order);
            const data = await response;
            setProducts(data.dato);
            setPagination({
                ...pagination,
                currentPage: page,
                nextPage: data.nextPage,
                prevPage: data.prevPage,
                totalPages: data.totalPages,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSort = async (column: string) => {
        try {
            setorder(column);
            fetchProducts(pagination.currentPage);
        } catch (error) {
            console.error('Error sorting products:', error);
        }
    };

    const handlePrevPage = () => {
        if (pagination.prevPage !== null) {
            fetchProducts(pagination.prevPage);
        }
    };

    const handleNextPage = () => {
        if (pagination.nextPage !== null) {
            fetchProducts(pagination.nextPage);
        }
    };

    const handleShowDeleteModalClose = () => {
        setShowDelete(false);
        fetchProducts(pagination.currentPage);
    };

    const Borrar = (id: number, name: string) => {
        setselectProdName(name);
        setselectProd(id);
        setShowDelete(true);

    }


    return (
        <div>
            {selectProd && <EditProductForm show={showEditModal} onHide={handleHideEditModal} productId={selectProd} />}
            {selectProd && selectProdName && <DeleteProduct name={selectProdName} show={showDelete} onHide={handleShowDeleteModalClose} productId={selectProd} />}

            <h2><span className='bi bi-bag' /> Lista de Productos</h2>
            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')}>ID</th>
                                <th onClick={() => handleSort('barcode')}>Barcode</th>
                                <th onClick={() => handleSort('name')}>Nombre</th>
                                <th onClick={() => handleSort('price')}>Precio</th>
                                <th onClick={() => handleSort('cost')}>Costo</th>
                                <th onClick={() => handleSort('quantity')}>Cantidad</th>
                                <th onClick={() => handleSort('date')}>Fecha</th>
                                <th onClick={() => handleSort('comment')}>Comentario</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <th><span className='bi bi-bag' /> {product.id}</th>
                                    <td>{product.barcode}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.cost}</td>
                                    <td>{product.quantity}</td>
                                    {product.date !== undefined && <td>{formatDate(product.date)}</td>}
                                    <td>{product.comment}</td>
                                    {product.id !== undefined && <td>
                                        <div className='d-grid gap-2'>
                                            <Button variant="primary" onClick={() => Edit(Number(product.id))}>
                                                <i className="bi bi-pencil mr-2"></i> Editar
                                            </Button>
                                            <Button variant="danger" onClick={() => Borrar(Number(product.id), product.name)}>
                                                <i className='bi bi-trash mr-2'></i> Eliminar
                                            </Button>
                                        </div>
                                    </td>}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div >
                        <Button onClick={handlePrevPage} disabled={pagination.prevPage === null}>
                            <i className="bi bi-arrow-left" /> Anterior
                        </Button>
                        <span>Página {pagination.currentPage} de {pagination.totalPages}</span>
                        <Button onClick={handleNextPage} disabled={pagination.nextPage === null}>
                            <i className="bi bi-arrow-right" /> Siguiente
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;