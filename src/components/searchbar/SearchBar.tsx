import React, { useState } from "react";
import { Nav, NavDropdown  } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchBar = () => {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Aquí puedes realizar alguna acción con el texto de búsqueda
        console.log(searchText);
    };

    return (

        <Nav className="navbar navbar-expand-xxl bg-body-tertiary">
            <div className="container-fluid">
                <Nav.Item className="navbar-brand">
                    <Link to="/home" className="nav-link">TATA APP</Link>
                </Nav.Item>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Nav.Link href="#" active>
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#">Link</Nav.Link>
                        </Nav.Item>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Item>
                            <Nav.Link disabled>Disabled</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Search"
                            onChange={handleInputChange}
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </Nav>

    );
};

export default SearchBar;