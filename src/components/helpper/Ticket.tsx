import React from 'react';
import './Ticket.css'; // Archivo CSS para estilos específicos del ticket

const Ticket = ({ }) => {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <h3>Nombre de la empresa</h3>
        <p>Dirección de la empresa</p>
        {/* Otras informaciones de la empresa */}
      </div>
      <div className="ticket-body">
        <h4>Detalles del ticket</h4>
        
        {/* Otras informaciones del ticket */}
      </div>
      <div className="ticket-footer">
       
        {/* Otros detalles del pago */}
      </div>
    </div>
  );
};

export default Ticket;