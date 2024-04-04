import React, { useEffect, useState } from "react";
import { Alert, Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { getCartTotalsByDay } from "../../functions/cart";
import { formatDateWithoutHours } from "functions/functios";
import Money from "components/helpper/Money";
import { Cart  } from "models/models";



const CartTotalsByDay: React.FC = () => {
    const now = new Date();
    const [totals, setTotals] = useState<Cart.cartList[]>([]);
    const [startDate, setStartDate] = useState<Date>(now);
    const [endDate, setEndDate] = useState<Date>(now);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

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
                setTotals(response);
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

    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <Alert variant='light'><h1>Lista de Totales Diarios de Carritos</h1></Alert>
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
                            <Col md={2}>
                                <Button className="mt-4" variant="primary" onClick={handleSearch}>Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totals.map((item, index) => (
                                <tr key={index}>
                                    <th>{item.idCart}</th>
                                    <td>{formatDateWithoutHours(item.date)}</td>
                                    <td><Money amount={item.total} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
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