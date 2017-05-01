import React from 'react';
import PropTypes from 'prop-types';

const Row = ({
  value,
}) => (
  <div className="Result card">
    <div className="card-block">
      { value }
    </div>
  </div>
);

Row.PropTypes = {
  value: PropTypes.string.isRequired,
};

export default Row;
