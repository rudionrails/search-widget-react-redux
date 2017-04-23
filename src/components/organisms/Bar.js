import React from 'react';
import Input from '../atoms/Input';
import './Bar.css';

const Bar = ({
  value,
  placeholder,
  onChange,
}) => (
  <div className="Bar container-fluid">
    <div className="row align-items-center">
      <div className="col col-10 offset-1 col-md-8 offset-md-2">
        <Input hint="Type for search or hit ESC to close" />
      </div>
    </div>
  </div>
);

export default Bar;
