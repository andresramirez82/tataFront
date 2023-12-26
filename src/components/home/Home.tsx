import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from 'components/sidebar/Sidebar';
import SearchBar from "components/searchbar/SearchBar";

function Home(): JSX.Element {
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'b') {
                searchInputRef.current?.focus();
                // Realiza la lógica que desees aquí
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (<div>
        <SearchBar inputRef={searchInputRef}/>
        <div className="container-xxl">
            <div className="row">
                <div className="col-md-1">
                    <Sidebar />
                </div>
                <div className="col-md-11 dashboard">
                    <div className="main-content">
                        <h1>Main Content</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Home;