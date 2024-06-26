import React, { useEffect, useState } from "react";
import {  Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { getCartTotalsByDay } from "../../functions/cart";
import { formatDateWithoutHours } from "../../functions/functios";
import { Cart } from "../../models/models";
import CartByDate from "../../components/sales/CartsByDate";
import Total from "./Total";



const CartTotalsByDay: React.FC = () => {
    const now = new Date();
    const [totals, setTotals] = useState<Cart.cartList[]>([]);
    const [startDate, setStartDate] = useState<Date>(now);
    const [endDate, setEndDate] = useState<Date>(now);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedCartDate, setselectedCartDate] = useState<Date>();

    useEffect(() => {
        fetchCartTotals();
    }, [page, limit, startDate, endDate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const dateValue = new Date(value);
        switch (name) {
            case "startDate":
                setStartDate(dateValue);
                break;
            case "endDate":
                setEndDate(dateValue);
                break;
        }
    };






    const fetchCartTotals = async () => {
        try {
            if (startDate && endDate) {
                const response = await getCartTotalsByDay(startDate, endDate, page, limit);
                /*const Acc: Cart.cartList[] = [];
                response.forEach((carts) => {
                    //console.log(formatDateWithoutHours(carts.cartDate), acumular(carts.sales, carts.discountsApplied));
                    Acc.push({
                        date: new Date((carts.cartDate)),
                        total: acumular(carts.sales, carts.discountsApplied)
                    })
                });
                // acumularTotalesPorFecha(Acc)
                */
                setTotals((response));
            }
        } catch (error) {
            console.error("Error fetching cart totals by day:", error);
        }
    };

    const handleSearch = () => {
        setPage(1); // Reset page to 1 when performing a new search
        fetchCartTotals();
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const SelectedDate = (fecha: Date) => {
        setselectedCartDate(fecha);
    }

    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <span ><h2><span className="bi bi-list" /> Lista de Totales Diarios de Carritos</h2></span>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Form>
                        <Row className="align-items-end">
                            <Col md={3}>
                                <Form.Group controlId="startDate">
                                    <Form.Label>Fecha Desde</Form.Label>
                                    <Form.Control name='startDate' type="date" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group controlId="endDate">
                                    <Form.Label>Fecha Hasta</Form.Label>
                                    <Form.Control name='endDate' type="date" onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group controlId="limit">
                                    <Form.Label>cantidad por página</Form.Label>
                                    <Form.Control name='limit' type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Button className="mt-4 col-12" variant="primary" onClick={handleSearch}><span className="bi-search"></span> Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="md-6">
                    <h4>Cierres</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totals.map((item, index) => (
                                <tr key={index}>
                                    <th onClick={() => SelectedDate(item.date)}>
                                        <a href='#' className='link-underline link-underline-opacity-0 link-underline-opacity-75-hover cursor-pointer'>
                                            <span className="bi-calendar-date"></span>
                                            {formatDateWithoutHours(item.date)}
                                        </a>
                                    </th>
                                    <td><Total date={item.date} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col className="md-6">
                    <h4>Carritos</h4>
                    {selectedCartDate && <CartByDate date={selectedCartDate} />}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Button className="me-2" disabled={page === 1} onClick={handlePrevPage}>Anterior</Button>
                    <Button disabled={totals.length < limit} onClick={handleNextPage}>Siguiente</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CartTotalsByDay;