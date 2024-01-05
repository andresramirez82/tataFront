import React, { useState, useEffect } from "react";
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { ProductClass } from "functions/api";
import { keyboardKey } from "@testing-library/user-event";
import Users from "components/users/Users";
import { Auth } from "models/models";
import { useNavigate } from "react-router-dom";


interface propsSearchBar {
    inputRef: React.RefObject<HTMLInputElement>
}

const SearchBar = (props: propsSearchBar) => {
    const [searchText, setSearchText] = useState("");
    const [user, setuser] = useState<Auth.AuthUser>();
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
        // Aquí puedes realizar alguna acción con el texto de búsqueda
        //console.log(searchText);
        if (searchText.length > 0) {
            ProductClass.searchProduct(searchText).then(serch => {
                if (serch.length > 0) {
                    alert(serch[0].name);
                }

            })
        }

    };

    useEffect(() => {
        const userSession: Auth.AuthUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        if (userSession.id === undefined) {
            Navigate("/");
        } 
        setuser(userSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const CloseSession = () => {
        sessionStorage.clear();
        Navigate("/");
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Mi Aplicación</Navbar.Brand>
            <Nav className="ml-auto">
                <NavDropdown title={<span className="bi bi-person" />} >
                    {user?.id && <NavDropdown.Item eventKey="perfil"><Users idUser={user?.id} /></NavDropdown.Item>}

                    <NavDropdown.Item eventKey="configuracion">Configuración</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="cerrarSesion" onClick={CloseSession}>Cerrar Sesión</NavDropdown.Item>
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


