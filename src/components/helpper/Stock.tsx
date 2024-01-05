import React from 'react';
import { Alert } from 'react-bootstrap';

interface StockAlertProps {
    currentStock: number;
    threshold: number;
  }

const StockAlert: React.FC<StockAlertProps> = ({ currentStock, threshold }) => {
  let variant = 'info'; // Por defecto, color azul para stock normal

  if (currentStock <= 0) {
    variant = 'danger'; // Rojo para stock agotado
  } else if (currentStock < threshold) {
    variant = 'warning'; // Amarillo para stock por debajo del umbral mínimo
  } else if (currentStock < 2 * threshold) {
    variant = 'info'; // Azul para stock dentro del umbral mínimo
  } else {
    variant = 'success'; // Verde para stock por encima del doble del umbral mínimo
  }

  return (
    <Alert variant={variant}>
      {currentStock <= 0 && '¡Stock agotado! '}
      {currentStock < threshold && '¡Stock bajo! '}
      {currentStock >= threshold && currentStock < 2 * threshold && '¡Stock normal! '}
      {currentStock >= 2 * threshold && '¡Stock alto! '}
    </Alert>
  );
};

export default StockAlert;