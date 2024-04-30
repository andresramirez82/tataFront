import React, { useState, useEffect } from "react";
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { keyboardKey } from "@testing-library/user-event";
import Users from "components/users/Users";
import { Auth } from "models/models";
import { useNavigate } from "react-router-dom";


interface propsSearchBar {
    inputRef: React.RefObject<HTMLInputElement>
}

const SearchBar = (props: propsSearchBar) => {
    const [searchText, setSearchText] = useState("");
    const [user, setUser] = useState<Auth.AuthUser>();
    const Navigate = useNavigate();

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
        Navigate(`/home/stock/${encodedText}`);
    };

    useEffect(() => {
        const userSession: Auth.AuthUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (userSession.id === undefined) {
            Navigate("/");
        }
        setUser(userSession);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const closeSession = () => {
        sessionStorage.clear();
        Navigate("/");
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Navbar.Brand href="/home">Despensa</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home/stock"><span className="bi bi-calculator"/> Stock</Nav.Link>
                    <NavDropdown title={<span className="bi bi-cart"> Ventas</span> }>
                        <NavDropdown.Item href="/home/sales"><span className="bi bi-cart"/> Nuevas Ventas</NavDropdown.Item>
                        <NavDropdown.Item href="/home/sales/list"><span className="bi bi-list"/> Listado</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/home/products"><span className="bi bi-bag"/> Productos</Nav.Link>
                    <Nav.Link href="/home/Discount"><span className="bi bi-percent"/> Descuentos</Nav.Link>
                    <Nav.Link href="/home/Customer"><span className="bi bi-person"/> Clientes</Nav.Link>
                </Nav>
            </Navbar.Collapse>

            <Nav className="ml-auto">
                <NavDropdown title={<span className="bi bi-person" />} >
                    {user?.id && <NavDropdown.Item eventKey="perfil"><Users idUser={user?.id} /></NavDropdown.Item>}

                    <NavDropdown.Item eventKey="configuracion" href="/home/Settings">Configuración</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="cerrarSesion" onClick={closeSession}>Cerrar Sesión</NavDropdown.Item>
                </NavDropdown>
            </Nav>

            <form className="d-none d-md-flex ms-auto" role="search" onSubmit={handleSubmit}>
                <input
                    ref={props.inputRef}
                    className="form-control me-2"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Search"
                    onChange={handleInputChange}
                    onKeyDown={handleKey}
                />
                <button className="btn btn-outline-success" type="submit">
                    Buscar
                </button>
            </form>
        </Navbar>
    );
};

export default SearchBar;