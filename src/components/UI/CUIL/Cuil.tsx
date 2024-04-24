import React, { InputHTMLAttributes, useRef } from "react";
import MaskedInput from "react-text-mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const cuilMask = [
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
];

const Cuil: React.FC<InputProps> = ({ ...props }) => {
  const inputRef = useRef<any>(null);

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cuit = e.target.value.replace(/\D/g, "");
    if (cuit.length === 11) {
      if (props.onChange !== undefined) {
        props.onChange(e);
        const inputElement = inputRef.current.inputElement;
        if (inputElement) {
          inputElement.setCustomValidity(""); // Ejecuta el método setCustomValidity()
        }
      }
    }
  };


  const handleInvalid = () => {
    const inputElement = inputRef.current.inputElement; // Accede al elemento DOM utilizando la referencia
    if (inputElement) {
      inputElement.setCustomValidity("Ingrese un CUIL o CUIT Válido"); // Ejecuta el método setCustomValidity()
    }
  };

  return (
    <div className="form-group mb-3">
      <label className="form-label">CUIL / CUIT</label>
      <MaskedInput
        className="form-control"
        mask={cuilMask}
        placeholder="xx-xxxxxxxx-x"
        pattern="[0-9]{2}-[0-9]{8}-[0-9]{1}"
        {...props}
        onChange={change}
        onInvalid={handleInvalid}
        ref={inputRef}
      />
      <small className="text-muted">XX-XXXXXXXX-X</small>
    </div>
  );
};

export default Cuil;