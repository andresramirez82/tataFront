import React, { useState, useEffect, useRef } from "react";
import { Nav, NavDropdown, Alert, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { searchProduct } from "functions/api";
import { keyboardKey } from "@testing-library/user-event";


interface propsSearchBar {
    inputRef: React.RefObject<HTMLInputElement>
}

const SearchBar = (props: propsSearchBar) => {
    const [searchText, setSearchText] = useState("");

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
            searchProduct(searchText).then(serch => {
                if (serch.length > 0) {
                    alert(serch[0].name);
                }

            })
        }

    };



    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Mi Aplicación</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Item>
                    <Nav.Link disabled>{'aaa'}</Nav.Link>
                </Nav.Item>
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


