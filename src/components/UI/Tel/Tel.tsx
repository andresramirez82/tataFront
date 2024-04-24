import React, { InputHTMLAttributes } from "react";
import MaskedInput from 'react-text-mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Tel: React.FC<InputProps> = ({ ...props }) => {
  return (
    <div className="form-group mb-3">
      <label className="form-label">Teléfono</label>
      <MaskedInput className="form-control"  mask={[
          '(',
          /[1-9]/,
          /\d/,
          /\d/,
          ')',
          ' ',
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]} 
        placeholder="(123) 456-7890"  {...props} />
    </div>
  );
};

export default Tel;