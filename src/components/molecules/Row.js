import React from 'react';
import PropTypes from 'prop-types';

const Row = ({
  value,
}) => (
  <div className="Result card">
    <div className="card-block">
      <div className="media">
        <img
          className="d-flex align-self-start mr-3"
          alt="64x64" 
          data-src="holder.js/64x64"
        />

        <div className="media-body">
          <h5 className="mt-0">{ value }</h5>
          <div>Some text to explain the item</div>
        </div>
      </div>
    </div>
  </div>
);

Row.PropTypes = {
  value: PropTypes.string.isRequired,
};

export default Row;
