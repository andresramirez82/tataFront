import React, { useState, useEffect } from "react";
import { Nav, NavDropdown, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { keyboardKey } from "@testing-library/user-event";
import Users from "@components/users/Users";
import { User } from "@models/user";
import { useNavigate } from "react-router-dom";
import { tokenDecode } from "@functions/User";
import Socket from "@components/helpper/Socket";
import ToggleButton from 'react-bootstrap/ToggleButton';

interface propsSearchBar {
    inputRef: React.RefObject<HTMLInputElement>
}

const SearchBar = (props: propsSearchBar) => {
    const [searchText, setSearchText] = useState("");
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const [showSocket, setshowSocket] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleKey = (event: keyboardKey) => {
        if (event.keyCode === 13) {
            handleSubmit(event as React.FormEvent);
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const encodedText = encodeURIComponent(searchText);
        navigate(`/home/stock/${encodedText}`);
    };

    useEffect(() => {
        tokenDecode().then(ul => {
            const userSession = ul.user;
            if (userSession.id === undefined) {
                navigate("/");
            }
            setUser(userSession);
        }).catch(() => {
            // console.error(err);
            navigate("/");
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const closeSession = () => {
        sessionStorage.clear();
        navigate("/");
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/home">Despensa</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home/stock"><span className="bi bi-calculator" /> Stock</Nav.Link>
                    <NavDropdown title={<span className="bi bi-cart"> Ventas</span>}>
                        <NavDropdown.Item href="/home/sales"><span className="bi bi-cart" /> Nuevas Ventas</NavDropdown.Item>
                        <NavDropdown.Item href="/home/sales/list"><span className="bi bi-list" /> Listado</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/home/products"><span className="bi bi-bag" /> Productos</Nav.Link>
                    <Nav.Link href="/home/Discount"><span className="bi bi-percent" /> Descuentos</Nav.Link>
                    <Nav.Link href="/home/Customer"><span className="bi bi-person" /> Clientes</Nav.Link>
                </Nav>
                <Nav className="me-10">
                    <Form className="d-flex mt-2 mt-lg-0 ms-auto" role="search" onSubmit={handleSubmit}>
                        <FormControl
                            ref={props.inputRef}
                            type="search"
                            placeholder="Buscar"
                            className="me-2"
                            aria-label="Search"
                            onChange={handleInputChange}
                            onKeyDown={handleKey}
                        />
                        <Button variant="outline-primary" type="submit">Buscar</Button>
                    </Form>
                </Nav>


                <Nav className="me-auto">
                    <ToggleButton
                        className=""
                        id="toggle-check"
                        type="checkbox"
                        variant="outline-success"
                        checked={showSocket}
                        value="1"
                        onChange={(e) => setshowSocket(e.currentTarget.checked)}
                    >Socket</ToggleButton>
                </Nav>
                <Nav className="ms-auto">
                    {user?.id && showSocket && <Socket user={user.username} />}
                    <NavDropdown title={<span className="bi bi-person" />} align="end">
                        {user?.id && <NavDropdown.Item eventKey="perfil"><Users idUser={user?.id} /></NavDropdown.Item>}
                        <NavDropdown.Item eventKey="configuracion" href="/home/Settings">Configuración</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="cerrarSesion" onClick={closeSession}>Cerrar Sesión</NavDropdown.Item>
                    </NavDropdown>
                </Nav>



            </Navbar.Collapse>
        </Navbar>
    );
};

export default SearchBar;
