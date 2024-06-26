import React, { useState } from 'react';
import { payments } from '../../models/cart';
import { Form, Modal } from 'react-bootstrap';
import { updatePayment } from "../../functions/cart";
import { toast } from 'react-toastify';

interface PaymentEditProps {
    show: boolean;
    onHide: () => void;
    selectdPayment: payments;
    onUpdate: () => void;
}


const PaymentEdit: React.FC<PaymentEditProps> = ({ show, onHide, selectdPayment, onUpdate }) => {
    const [tipo, setTipo] = useState<string>(selectdPayment.tipo);
    const [isFormInvalid, setIsFormInvalid] = useState(false);


    const onSave = () => {
        const Updated: payments = {
            id: selectdPayment.id,
            tipo: tipo
        };
        updatePayment(Updated).then(() => {
            onUpdate();
            onHide();
        }).catch(error => {
            toast(`Error al modificar el método de pago ${selectdPayment.id} - de ${selectdPayment.tipo} => ${tipo} `);
            console.error(error);
        })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;


        if (form.checkValidity()) {
            const newPayment: payments = { tipo }; // Suponiendo que Payment tiene una propiedad 'tipo'
            SaveUpdate(newPayment);
            setTipo('');
        } else {
            // Si hay errores de validación, muestra los mensajes de error
            e.stopPropagation();
            setIsFormInvalid(true);
        }
    };


    const SaveUpdate = (updatedPayment: payments) => {
        console.log(updatedPayment);
    }

    return (<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Actualizar Medio de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit} noValidate validated={isFormInvalid}>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    />
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>

            <button className="btn btn-secondary" onClick={onHide}>
                <i className="bi bi-x"></i> Cancelar
            </button>
            <button className="btn btn-primary" onClick={onSave}>
                <i className="bi bi-floppy"></i>  Guardar
            </button>
        </Modal.Footer>
    </Modal>
    )
}

export default PaymentEdit;