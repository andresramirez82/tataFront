// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Sidebar: React.FC = () => {
  return (
    <ul className="nav d-flex flex-md-column flex-row">
      <li className="nav-item">
        <a className="nav-link active" href="/home">
          <i className="bi bi-house-door-fill mr-2"></i>
          Inicio
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/home/stock">
          <i className="bi bi-person-fill mr-2"></i>
          Stock
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/home/ventas">
          <i className="bi bi-cart-fill mr-2"></i>
          Ventas
        </a>
      </li>
    </ul>
  );
};

export default Sidebar;