import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {  ProductClass } from "functions/api";
import { toast } from 'react-toastify';

interface CreateProductFormProps {
    show: boolean;
    onHide: () => void;
    name: string
    productId: number;
}



const CreateProductForm: React.FC<CreateProductFormProps> = ({ show, onHide, name, productId }) => {

    const handleDeleteProduct = async () => {
        try {
            await ProductClass.deleteProduct(productId);
            toast(`Producto ${name} eliminado correctamente`);
            // Puedes redirigir o realizar otras acciones después de eliminar el producto
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            toast('Hubo un error al eliminar el producto');
        } finally {
            onHide();
        }
    };

    
    return (<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>¿Estás seguro de que deseas eliminar el producto {name}?</p>
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

export default CreateProductForm;


