// src/components/product/EditProductForm.tsx
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Form, Container, Modal, Row, Col, Carousel, Table } from 'react-bootstrap';
import { CartClass } from 'functions/api';
import { Product, Sale, Cart } from 'models/models';
import Stock from "components/helpper/Stock";
import { toast } from 'react-toastify';
import Barcode from 'react-barcode';
import { formatDate } from 'functions/functios';
import { acumular } from 'functions/functios';
import MoneyFormatter from 'components/helpper/Money';





interface propsCartbydate {
    date: Date;
}


const CartByDate: React.FC<propsCartbydate> = ({ date }) => {
    const [cart, setcart] = useState<Cart.cart[]>()

    useEffect(() => {
        if (date) {
            CartClass.getCartByDate(date).then(c => {
                setcart(c)
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Vendedor</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.map((c, i) => {
                        return (<tr key={i}>
                            <th>{c.id}</th>
                            <td>{formatDate(c.cartDate)}</td>
                            <td>{c.user.name}</td>
                            <td><MoneyFormatter amount={acumular(c.sales, c.discountsApplied)}></MoneyFormatter></td>
                            
                        </tr>);
                    })}
                </tbody>
            </Table>
        </Container>)
}

export default CartByDate;