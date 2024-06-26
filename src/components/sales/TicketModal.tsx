import React from "react";
import { Modal, ModalHeader, ModalTitle } from "react-bootstrap";
import Ticket from "@components/helpper/Ticket";
import { Cart } from "@models/models";
import { PDFViewer } from '@react-pdf/renderer';

interface TicketModalProps {
    cart: Cart.cart;
    show: boolean;
    onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ cart, show, onClose }) => {
    return <Modal show={show} onHide={onClose}>
        <ModalHeader>
            <ModalTitle>
                Comprobante Nº {cart.id}
            </ModalTitle>
        </ModalHeader>
        <Modal.Body>
            <PDFViewer width="100%" height="600">
                <Ticket cart={cart} />
            </PDFViewer>
        </Modal.Body>
        <Modal.Footer>
            <span className="btn btn-primary" onClick={onClose} autoFocus>Cerrar</span>
        </Modal.Footer>
    </Modal>
}

export default TicketModal;