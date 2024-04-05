// src/components/product/EditProductForm.tsx
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Form, Container, Modal, Row, Col, Carousel, Alert } from 'react-bootstrap';
import { CartClass } from 'functions/api';
import { Product, Sale, Cart } from 'models/models';
import Stock from "components/helpper/Stock";
import { toast } from 'react-toastify';
import Barcode from 'react-barcode';
import { formatDate } from 'functions/functios';





interface propsCartbydate {
    date: Date;
}


const CartByDate: React.FC<propsCartbydate> = ({ date }) => {
    const [cart, setcart] = useState<Cart.cart>()

    useEffect(() => {
        if (date) {
            CartClass.getCartByDate(date).then(c => {
                console.log(c)
            }).catch(
                e => {
                    console.error(e.response.data.message)
                    toast(e.response.data.message)
                }
            )
        }
    }, [date])


    return (

        <Container>
            <h4></h4>
        </Container>)
}

export default CartByDate;