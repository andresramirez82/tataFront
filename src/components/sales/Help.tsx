import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Image, Row, Col, Table } from 'react-bootstrap';

interface HelpModal {
    show: boolean;
    onClose: () => void;
}
const ConfirmarVentaModal: React.FC<HelpModal> = ({ show, onClose }) => {
    return (<Modal show={show} onHide={onClose}>
        <Modal.Header>
            <h4>Ayuda</h4>
        </Modal.Header>
        <Modal.Body>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Acción</th>
                        <th>Método abreviado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Finalizar venta</td>
                        <td><kbd>Espacio</kbd></td>
                    </tr>
                    <tr>
                        <td>Cancelar Venta</td>
                        <td><kbd>BackSpace</kbd></td>
                    </tr>
                    <tr>
                        <td>Agregar Producto</td>
                        <td><kbd>Enter</kbd></td>
                    </tr>
                    <tr>
                        <td>Confirmar Venta</td>
                        <td><kbd>C</kbd></td>
                    </tr>
                </tbody>
            </Table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
    </Modal>)
}

export default ConfirmarVentaModal;
