import React from 'react';
import './Input.css';

const Input = ({
  placeholder = "Search",
  hint,
  value,
  onChange,
}) => (
  <div className="Input">
    <div className="input-group">
      <input
        type="text"
        className="form-control display-1"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>

    {hint && <small className="Input-hint">{hint}</small>}
  </div>
);

export default Input;
