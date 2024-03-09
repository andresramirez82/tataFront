// DiscountManagementScreen.tsx

import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchDiscounts, searchProduct } from "functions/product";
import { formatDate } from "functions/functios";
import Money from "components/helpper/Money";
import { discounts } from "models/discount";
import { products } from "models/products";
import { Product } from 'models/models';


const DiscountManagementScreen: React.FC = () => {
    const now = new Date();
    const navigate = useNavigate();
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [discounts, setDiscounts] = useState<discounts[]>([]);
    const [formData, setFormData] = useState<Partial<discounts>>({
        name: '',
        startDate: now,
        endDate: now,
        discountAmount: 0,
        requiredQuantity: 0
    });
    const [product, setproduct] = useState<products>()

    // Función para cargar los descuentos
    const loadDiscounts = async () => {
        // Aquí deberías hacer la llamada a tu API para obtener los descuentos
        // Por simplicidad, aquí solo se muestra un array vacío
        const data: discounts[] = (await fetchDiscounts(1, 'id')).dato;
        setDiscounts(data);
    };

    // Cargar los descuentos al montar el componente
    useEffect(() => {
        loadDiscounts();
    }, []);

    // Función para redirigir a la pantalla de creación de descuentos
    const handleCreateDiscount = () => {
        navigate('/create-discount');
    };

    // Función para abrir el modal de creación de descuentos
    const handleShowModal = () => {
        setShowModal(true);
    };

    // Función para cerrar el modal de creación de descuentos
    const handleCloseModal = () => {
        setShowModal(false);
        // Limpiar el formulario al cerrar el modal
        setFormData({
            name: '',
            startDate: now,
            endDate: now,
            discountAmount: 0,
            requiredQuantity: 0,
            product: undefined
        });
    };

    // Función para manejar el cambio en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            setIsFormInvalid(false);
            console.table(formData)
        } else {
            // Si hay errores de validación, muestra los mensajes de error
            e.stopPropagation();
            setIsFormInvalid(true);
        }
        form.classList.add('was-validated');
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        searchProduct(e.currentTarget.value).then(prod => {
            if (prod.length === 1) {
                setproduct(prod[0]);
                setFormData(prevState => ({
                    ...prevState,
                    product: prod[0]
                }));
            }
        })
    }

    return (
        <Container>
            <h1>Administrar Descuentos</h1>
            <Button onClick={handleShowModal} variant="primary">Crear Descuento</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Producto</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                        <th>Monto de Descuento</th>
                        <th>Cantidad Requerida</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts.map(discount => (
                        <tr key={discount.id}>
                            <td>{discount.id}</td>
                            <td>{discount.name}</td>
                            <td>{discount.product.name}</td>
                            <td>{formatDate(discount.startDate)}</td>
                            <td>{formatDate(discount.endDate)}</td>
                            <td><Money amount={discount.discountAmount}></Money></td>
                            <td>{discount.requiredQuantity}</td>
                            <td>
                                {/* Agregar aquí botones para editar y eliminar el descuento */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal de creación de descuentos */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Descuento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} noValidate validated={isFormInvalid}>
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="product">
                            <Form.Label>Producto</Form.Label>
                            <Form.Control name="product" onChange={handleProductChange} required>
                            </Form.Control>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <td>codigo</td>
                                        <td>nombre</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product?.barcode && <td>
                                        {product?.barcode}
                                    </td>}

                                    <td>
                                        {product?.name}
                                    </td>
                                </tbody>
                            </Table>
                            <label>{product?.barcode}</label>
                        </Form.Group>
                        <Form.Group controlId="startDate">
                            <Form.Label>Fecha de Inicio</Form.Label>
                            {formData.startDate && <Form.Control type="datetime-local" name="startDate" value={formatDate(formData.startDate)} onChange={handleChange} required />}
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label>Fecha de Fin</Form.Label>
                            {formData.endDate && <Form.Control type="datetime-local" name="endDate" value={formatDate(formData.endDate)} onChange={handleChange} required />}
                        </Form.Group>
                        <Form.Group controlId="discountAmount">
                            <Form.Label>Monto de Descuento</Form.Label>
                            <Form.Control type="number" name="discountAmount" value={formData.discountAmount || 0} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="requiredQuantity">
                            <Form.Label>Cantidad Requerida</Form.Label>
                            <Form.Control type="number" name="requiredQuantity" value={formData.requiredQuantity || 0} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Crear Descuento</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default DiscountManagementScreen;