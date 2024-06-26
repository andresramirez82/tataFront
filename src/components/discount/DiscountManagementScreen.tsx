// DiscountManagementScreen.tsx

import React, { useEffect, useState } from 'react';
import { Button, Container, Table, Modal, Form } from 'react-bootstrap';
import { fetchDiscounts, searchProduct, CreateDiscounts } from "../../functions/product";
import { formatDate } from "../../functions/functios";
import { discounts, DiscountDays as DiscountDaysT } from "../../models/discount";
import { products } from "../../models/products";
import { toast } from 'react-toastify';

import DiscountDays from "./DiscountDays";
import WeekDays from "./WeekDays";
import EditDiscount from "./Edit";
import DeleteDiscount from "./Delete";


const Descuentos: DiscountDaysT = { "0": true, "1": true, "2": true, "3": true, "4": true, "5": true, "6": true }

const DiscountManagementScreen: React.FC = () => {
    const now = new Date();
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [discounts, setDiscounts] = useState<discounts[]>([]);
    const [formData, setFormData] = useState<Partial<discounts>>({
        name: '',
        startDate: now,
        endDate: now,
        discountAmount: 0,
        requiredQuantity: 0
    });
    const [product, setproduct] = useState<products>();

    const [selectDiscount, setselectDiscount] = useState<number>();
    const [selectDiscountName, setselectDiscountName] = useState<string>();

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
            AddDiscount();
        } else {
            // Si hay errores de validación, muestra los mensajes de error
            e.stopPropagation();
            setIsFormInvalid(true);
        }
        form.classList.add('was-validated');
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value !== '') {
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

    }

    const AddDiscount = () => {
        if (formData.name && product && formData.discountAmount && formData.endDate && formData.requiredQuantity && formData.startDate && formData.discountDays) {
            const newDiscount: discounts = {
                name: formData.name,
                discountAmount: formData.discountAmount,
                endDate: formData.endDate,
                requiredQuantity: formData.requiredQuantity,
                startDate: formData.startDate,
                product,
                discountDays: formData.discountDays
            }
            CreateDiscounts(newDiscount).then(n => {
                toast(`Se ha insertado correctamente el descuento ${newDiscount.name} en el producto ${newDiscount.product.name}`);
            }).catch(err => {

                toast(`Ha habido un error al insertar el descuento ${newDiscount.name} en el producto ${newDiscount.product.name}`);
            }).finally(() => {
                loadDiscounts();
                handleCloseModal();
            })
            // console.log(newDiscount);
        }
    }

    const Edit = (id: number) => {
        setShowEditModal(true);
        setselectDiscount(id);
    }

    const Borrar = (id: number, name: string) => {
        setselectDiscountName(name);
        setselectDiscount(id);
        setShowDelete(true);

    }


    const hideEdit = () => {
        setShowEditModal(false);
        loadDiscounts();
    }

    const hideDelete = () => {
        setShowDelete(false);
        loadDiscounts();
    }

    const onChangeDays = (newdiscountDays: any) => {
        setFormData(prevState => ({
            ...prevState,
            discountDays: newdiscountDays
        }));
    }

    return (
        <Container>
            {selectDiscount && <EditDiscount discountId={selectDiscount} onHide={hideEdit} show={showEditModal} />}
            {selectDiscount && selectDiscountName && <DeleteDiscount discountId={selectDiscount} onHide={hideDelete} show={showDelete} name={selectDiscountName} />}
            <h2><span className='bi bi-percent' /> Administrar Descuentos</h2>
            <Button onClick={handleShowModal} variant="primary"><span className='bi bi-plus' /> Crear Descuento</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Producto</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Fin</th>
                        <th>Descuento</th>
                        <th>Cantidad Requerida</th>
                        <th>Días</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts.map(discount => (
                        <tr key={discount.id}>
                            <th><span className='bi bi-percent' /> {discount.id}</th>
                            <td>{discount.name}</td>
                            <td>{discount.product.name}</td>
                            <td>{formatDate(discount.startDate)}</td>
                            <td>{formatDate(discount.endDate)}</td>
                            <td>{discount.discountAmount} %</td>
                            <td>{discount.requiredQuantity}</td>
                            <td><WeekDays weekSchedule={discount.discountDays} /></td>
                            <td>
                                <div className='d-grid gap-2'>
                                    <Button variant="primary" onClick={() => Edit(Number(discount.id))}>
                                        <i className="bi bi-pencil mr-2"></i> Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => Borrar(Number(discount.id), discount.name)}>
                                        <i className='bi bi-trash mr-2'></i> Eliminar
                                    </Button>
                                </div>

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
                            {formData.startDate && <Form.Control type="datetime-local" name="startDate" onChange={handleChange} required />}
                        </Form.Group>
                        <Form.Group controlId="endDate">
                            <Form.Label>Fecha de Fin</Form.Label>
                            {formData.endDate && <Form.Control type="datetime-local" name="endDate" onChange={handleChange} required />}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Días de la semana</Form.Label>
                            <DiscountDays onSave={onChangeDays} discountDaysData={Descuentos} />
                        </Form.Group>
                        <Form.Group controlId="discountAmount">
                            <Form.Label>Descuento</Form.Label>
                            <Form.Control type="number" name="discountAmount" value={formData.discountAmount || 0} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="requiredQuantity">
                            <Form.Label>Cantidad Requerida</Form.Label>
                            <Form.Control type="number" name="requiredQuantity" value={formData.requiredQuantity || 0} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" onSubmit={AddDiscount}>Crear Descuento</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default DiscountManagementScreen;