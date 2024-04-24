import React, { InputHTMLAttributes, useRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Email: React.FC<InputProps> = ({ ...props }) => {
  const inputRef = useRef<any>(null);

  const handleInvalid = () => {
    const inputElement = inputRef.current; // Accede al elemento DOM utilizando la referencia
    if (inputElement) {
      inputElement.setCustomValidity("Ingrese correo válido"); // Ejecuta el método setCustomValidity()
      console.log('inputElement');
    }
    
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={props.name}>
        {props["aria-label"]}
      </label>
      <input
        ref={inputRef}
        className="form-control"
        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        type="text"
        onInvalid={handleInvalid}
        {...props}
        onChange={change}
      />
      <small className="form-text text-muted">
        {props["aria-description"]}
      </small>
    </div>
  );
};

export default Email;