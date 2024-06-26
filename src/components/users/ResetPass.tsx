import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { resetPass } from "@functions/User";
import { toast } from 'react-toastify';

interface ResetPassProps {
    show: boolean;
    onHide: () => void;
    idUser: number;
}


const ResetPass: React.FC<ResetPassProps> = ({ show, onHide, idUser }) => {
    const [pass, setPass] = useState<string>('');
    const [isFormInvalid, setIsFormInvalid] = useState(false);


    const onSave = () => {
        resetPass(idUser, pass).then((resp) => {
            onHide();
            toast.success(`${resp.message}`);
        }).catch(error => {
            toast.error(`Error al modificar el método de pago ${idUser} - de ${pass}`);
            console.error(error);
        })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;


        if (form.checkValidity()) {
            
            SaveUpdate();
            setPass('');
        } else {
            // Si hay errores de validación, muestra los mensajes de error
            e.stopPropagation();
            setIsFormInvalid(true);
        }
    };


    const SaveUpdate = () => {
        console.log();
    }

    return (<Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Actualizar Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit} noValidate validated={isFormInvalid}>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="tipo"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
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

export default ResetPass;