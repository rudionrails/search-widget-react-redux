import React from 'react';
import PropTypes from 'prop-types';

const Clear = ({
  onClick,
}) => (
  <span className="sw-Clear input-group-addon" onClick={onClick}>
    <i className="material-icons">clear</i>
  </span>
);

Clear.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Clear;
