import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

interface DiscountDaysFormProps {
  discountDaysData?: { [key: string]: boolean };
  onSave: (discountDays: { [key: string]: boolean }) => void;
}

const DiscountDaysForm: React.FC<DiscountDaysFormProps> = ({ discountDaysData = {}, onSave }) => {
  const [discountDays, setDiscountDays] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Inicializar el estado con los datos recibidos por props o establecer todos los días como verdaderos si no se proporciona ningún dato
    if (Object.keys(discountDaysData).length === 0) {
      setDiscountDays({
        "0": true,
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true,
        "6": true
      });
    } else {
      setDiscountDays(discountDaysData);
    }
  }, [discountDaysData]);

  const handleCheckboxChange = (day: string) => {
    const updatedDiscountDays = {
      ...discountDays,
      [day]: !discountDays[day]
    };
    setDiscountDays(updatedDiscountDays);
    onSave(updatedDiscountDays); // Llamar a onSave después de actualizar el estado
  };

  return (
    <span className='inline'>
      <Form.Group>
        {Object.keys(discountDays).map((day, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            label={getDayName(parseInt(day))}
            checked={discountDays[day]}
            onChange={() => handleCheckboxChange(day)}
          />
        ))}
      </Form.Group>
    </span>
  );
};

// Función para obtener el nombre del día a partir de su número
const getDayName = (dayNumber: number) => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return daysOfWeek[dayNumber];
};

export default DiscountDaysForm;