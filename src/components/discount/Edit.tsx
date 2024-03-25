// src/components/product/EditProductForm.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Modal, Table } from 'react-bootstrap';
import { DiscountClass } from 'functions/api';
import { formatDateISO } from "functions/functios";
import { Discount, Product } from 'models/models';
import { searchProduct } from "functions/product";
import DiscountDays from "./DiscountDays";
import { toast } from 'react-toastify';


interface EditProductFormProps {
    show: boolean;
    onHide: () => void;
    discountId: number;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ show, onHide, discountId }) => {
    const [discountsDetails, setDiscountsDetails] = useState<Partial<Discount.discount> | null>(null);
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [product, setproduct] = useState<Product.product>();

    useEffect(() => {
        const fetchDiscountDetails = async () => {
            try {
                const fetchedProduct = await DiscountClass.getDiscount(discountId);
                searchProduct(fetchedProduct.product.barcode).then(prod => {
                    if (prod.length === 1) {
                        setproduct(prod[0]);
                        setDiscountsDetails(prevState => ({
                            ...prevState,
                            product: prod[0]
                        }));
                    }
                })
                setDiscountsDetails(fetchedProduct);
            } catch (error) {
                console.error('Error al obtener detalles del producto:', error);
            }
        };

        if (show) {
            fetchDiscountDetails();
        }
    }, [show, discountId]);

    const handleSaveChanges = async () => {
        // Agregar lógica para guardar los cambios en la API
        if (discountsDetails && product && discountsDetails.discountDays) {
            try {
                const descuento: Discount.discount = {
                    name: discountsDetails.name || "Default Name",
                    discountAmount: discountsDetails.discountAmount || 0,
                    endDate: discountsDetails.endDate || new Date(),
                    startDate: discountsDetails.startDate || new Date(),
                    discountDays: discountsDetails.discountDays,
                    product: discountsDetails.product || product,
                    requiredQuantity: discountsDetails.requiredQuantity || 0,
                    id: discountsDetails.id || 0
                };
                const update = await DiscountClass.UpdateDiscounts(descuento);
                console.log(update);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDiscountsDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const startDate = e.target.value;

        setDiscountsDetails(prevState => ({
            ...prevState,
            startDate: new Date(startDate)
        }));
    };

    const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const endDate = e.target.value;
        setDiscountsDetails(prevState => ({
            ...prevState,
            endDate: new Date(endDate)
        }));
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== '') {
            searchProduct(e.currentTarget.value).then(prod => {
                if (prod.length === 1) {
                    setproduct(prod[0]);
                    setDiscountsDetails(prevState => ({
                        ...prevState,
                        product: prod[0]
                    }));
                }
            })
        }
    }

    const onChangeDays = (newdiscountDays: any) => {
        setDiscountsDetails(prevState => ({
            ...prevState,
            discountDays: newdiscountDays
        }));
    }


    return (
        <Modal show={show} onHide={onHide}>
            <Form noValidate validated={isFormInvalid} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Descuento ({discountId})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {discountsDetails && (
                        <>
                            <Form.Group controlId="productName">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={discountsDetails.name}
                                    onChange={(e) => setDiscountsDetails({ ...discountsDetails, name: e.target.value })}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor ingrese un nombre para el descuento
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="product">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control name="product" onChange={handleProductChange}  >
                                </Form.Control>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td>codigo</td>
                                            <td>nombre</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {product?.barcode && <td>
                                                {product?.barcode}
                                            </td>}

                                            <td>
                                                {product?.name}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Form.Group>
                            <Form.Group controlId="startDate">
                                <Form.Label>Fecha de Inicio</Form.Label>
                                {discountsDetails.startDate && <Form.Control type="datetime-local" name="startDate" value={formatDateISO(discountsDetails.startDate)} onChange={handleStartDateChange} required />}
                            </Form.Group>
                            <Form.Group controlId="endDate">
                                <Form.Label>Fecha de Fin</Form.Label>
                                {discountsDetails.endDate && <Form.Control type="datetime-local" name="endDate" value={formatDateISO(discountsDetails.endDate)} onChange={handleEndDateChange} required />}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Días de la semana</Form.Label>
                                <DiscountDays onSave={onChangeDays} discountDaysData={discountsDetails.discountDays}/>
                            </Form.Group>
                            <Form.Group controlId="discountAmount">
                                <Form.Label>Monto de Descuento</Form.Label>
                                <Form.Control type="number" name="discountAmount" value={discountsDetails.discountAmount || 0} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="requiredQuantity">
                                <Form.Label>Cantidad Requerida</Form.Label>
                                <Form.Control type="number" name="requiredQuantity" value={discountsDetails.requiredQuantity || 0} onChange={handleChange} required />
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