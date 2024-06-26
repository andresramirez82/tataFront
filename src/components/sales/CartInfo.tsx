// src/components/product/EditProductForm.tsx
import React, { useState, useEffect } from 'react';
import {  Container, Modal, Row, Col } from 'react-bootstrap';
import { CartClass } from '@functions/api';
import { Cart } from '@models/models';
//import Stock from "@components/helpper/Stock";
import { toast } from 'react-toastify';
//import Barcode from 'react-barcode';
import { formatDate } from '@functions/functios';





interface EditProductFormProps {
    show: boolean;
    onHide: () => void;
    idCart: number;
}


const CartInfo: React.FC<EditProductFormProps> = ({ show, onHide, idCart }) => {
    const [cart, setcart] = useState<Cart.cart>()

    useEffect(() => {
        if (idCart) {
            CartClass.getCart(idCart).then(c => {
                setcart(c);
            }).catch(
                e => {
                    console.error(e.response.data.message)
                    toast(e.response.data.message)
                }
            )
        }
    }, [idCart])


    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-lg">
            <Container>
                <Modal.Header closeButton>
                    <Modal.Title>Cart {idCart}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>Fecha: <span className="fw-bold">{cart && formatDate(cart.cartDate)}</span></Col>
                        <Col>Vendedor: <span className="fw-bold">{cart?.user && cart.user.name}</span>
                        </Col>
                    </Row>
                </Modal.Body>
            </Container>
        </Modal>)
}

export default CartInfo;