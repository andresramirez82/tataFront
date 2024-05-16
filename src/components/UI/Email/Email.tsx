import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Email: React.FC<InputProps> = ({ ...props }) => {

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

        className="form-control"

        type="email"

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