import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditProductForm from './EditProductForm';
import { formatDate } from "functions/functios";

interface Product {
    id: number;
    barcode: string;
    name: string;
    price: number;
    cost: number;
    threshold: number;
    quantity: number;
    date: Date;
    comment: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        nextPage: null as number | null,
        prevPage: null as number | null,
    });
    const [order, setorder] = useState<string>('id');
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectProd, setselectProd] = useState<number>()

    const Edit = (id: number) => {
        setShowEditModal(true);
        setselectProd(id);
    }

    const handleHideEditModal = () => {
        setShowEditModal(false);
    };

    useEffect(() => {
        fetchProducts(pagination.currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.currentPage]);

    const fetchProducts = async (page: number) => {
        try {
            const response = await fetch(`http://localhost:5000/products?page=${pagination.currentPage}&sort=${order}`);
            const data = await response.json();
            setProducts(data.products);
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

    return (
        <div>
            {selectProd && <EditProductForm show={showEditModal} onHide={handleHideEditModal} productId={selectProd} />}

            <h1>Lista de Productos</h1>
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
                                    <td>{product.id}</td>
                                    <td>{product.barcode}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.cost}</td>
                                    <td>{product.quantity}</td>
                                    <td>{formatDate(product.date)}</td>
                                    <td>{product.comment}</td>
                                    <td><Button variant="primary" onClick={() => Edit(product.id)}>
                                        <i className="bi bi-pencil mr-2"></i> Editar
                                    </Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div>
                        <Button onClick={handlePrevPage} disabled={pagination.prevPage === null}>
                            Anterior
                        </Button>
                        <span>Página {pagination.currentPage} de {pagination.totalPages}</span>
                        <Button onClick={handleNextPage} disabled={pagination.nextPage === null}>
                            Siguiente
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;