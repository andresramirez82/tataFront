import React, { InputHTMLAttributes, useRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const URLInput: React.FC<InputProps> = ({ ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInvalid = () => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.setCustomValidity("Ingrese una URL válida");
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
        {props.label}
      </label>
      <input
        ref={inputRef}
        className="form-control"
        pattern="https?://.+"
        type="url"
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

export default URLInput;