import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {  DiscountClass } from "functions/api";
import { toast } from 'react-toastify';

interface CreateProductFormProps {
    show: boolean;
    onHide: () => void;
    name: string
    discountId: number;
}



const DeleteModalDiscount: React.FC<CreateProductFormProps> = ({ show, onHide, name, discountId }) => {

    const handleDeleteProduct = async () => {
        try {
            await DiscountClass.deleteDiscount(discountId);
            toast(`Descuento ${name} eliminado correctamente`);
            // Puedes redirigir o realizar otras acciones después de eliminar el producto
        } catch (error) {
            console.error('Error al eliminar Descuento:', error);
            toast('Hubo un error al eliminar el Descuento');
        } finally {
            onHide();
        }
    };

    
    return (<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>¿Estás seguro de que deseas eliminar el Descuento {name}?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteProduct}>
                Eliminar
            </Button>
        </Modal.Footer>
    </Modal>);

}

export default DeleteModalDiscount;


