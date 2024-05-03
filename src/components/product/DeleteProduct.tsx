import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ProductClass } from "functions/api";
import { toast } from 'react-toastify';
import { AxiosError } from "axios";
import { ErrorResponse } from "models/models";

interface CreateProductFormProps {
    show: boolean;
    onHide: () => void;
    name: string
    productId: number;
}



const CreateProductForm: React.FC<CreateProductFormProps> = ({ show, onHide, name, productId }) => {

    const handleDeleteProduct = async () => {
        ProductClass.deleteProduct(productId).then(p => {
            toast(`Producto ${name} eliminado correctamente`);
        }).catch(
            (err: AxiosError<ErrorResponse>) => {
                console.error(`${err.response}`);
                toast(`${err.response?.data.message}`)
            }
        ).finally(() => {
            onHide();
        })
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


