import React from 'react';
import './input.styles.scss';

const InputBox = ({ label, required, type }) => {
  return (
    <div className="input__box">
      <p>
        {required && '* '} {label}
      </p>
      <input type="text" />
    </div>
  );
};

export default InputBox;
