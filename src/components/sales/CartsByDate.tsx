/* eslint-disable react-hooks/exhaustive-deps */
// src/components/product/EditProductForm.tsx
import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { CartClass } from 'functions/api';
import { Cart } from 'models/models';
import { toast } from 'react-toastify';
import { formatDate } from 'functions/functios';
import { acumular } from 'functions/functios';
import MoneyFormatter from 'components/helpper/Money';
import Spinner from "components/helpper/Spinner";





interface propsCartbydate {
    date: Date;
}


const CartByDate: React.FC<propsCartbydate> = ({ date }) => {
    const [cart, setcart] = useState<Cart.cart[]>();
    const [totales, settotales] = useState({ sales: 0, discount: 0 });

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

    useEffect(() => {
        totalCalculate();
    }, [cart])


    const totalCalculate = () => {
        let TSales: number = 0;
        let TDiscount: number = 0;
        cart?.forEach(c => {
            c.sales.forEach(s => {
                TSales = TSales + s.totalPrice;
            });
            c.discountsApplied.forEach(d => {
                TDiscount = TDiscount + d.discount;
            });
        });

        settotales({
            sales: TSales,
            discount: TDiscount
        });
    }

    return (

        <Container>
            {cart === undefined && <Spinner />}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Fecha</th>
                        <th>Vendedor</th>
                        <th>Pago</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.map((c, i) => {
                        return (<tr key={i}>
                            <th><span className="bi-cart"></span> {c.id}</th>
                            <td>{formatDate(c.cartDate)}</td>
                            <td>{c.user.name}</td>
                            <td>{c.payment.tipo}</td>
                            <td><MoneyFormatter amount={acumular(c.sales, c.discountsApplied)}></MoneyFormatter></td>
                        </tr>);
                    })}
                </tbody>
                <thead>
                    <tr>
                        <th colSpan={5}>Totales</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan={3}><i className="bi bi-currency-dollar"></i> Ventas</th>
                        <td colSpan={2}><MoneyFormatter amount={totales.sales} /></td>
                    </tr>
                    <tr>
                        <th colSpan={3} ><i className="bi bi-percent"></i> Descuentos</th>
                        <td colSpan={2}><MoneyFormatter amount={totales.discount} /></td>
                    </tr>
                </tbody>
            </Table>
        </Container>)
}

export default CartByDate;