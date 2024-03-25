import React from 'react';
import { Badge } from 'react-bootstrap';

interface WeekDaysProps {
  weekSchedule: {
    [key: number]: boolean;
  };
}

const WeekDaysComponent: React.FC<WeekDaysProps> = ({ weekSchedule }) => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <div>
      {Object.entries(weekSchedule).map(([index, isSelected]) => {
        const dayOfWeek = daysOfWeek[parseInt(index)];

        return (
          isSelected && (
            <Badge key={index} pill className="m-1">
              {dayOfWeek}
            </Badge>
          )
        );
      })}
    </div>
  );
};

export default WeekDaysComponent;