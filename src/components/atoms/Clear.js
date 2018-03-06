import React from 'react';
import PropTypes from 'prop-types';

const Clear = ({
  onClick,
}) => (
  <div className="input-group-append" onClick={onClick}>
    <span className="sw-Clear input-group-text">
      <i className="material-icons">clear</i>
    </span>
  </div>
);

Clear.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Clear;
