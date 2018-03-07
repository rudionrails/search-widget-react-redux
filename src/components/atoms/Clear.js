import React from 'react';
import PropTypes from 'prop-types';
import './Clear.css';

const Clear = ({
  show = false,
  onClick,
}) => {
  const classnames = [
    'input-group-append',
    'sw-Clear',
    show ? 'is-visible' : 'is-hidden',
  ].join(' ');

  return (
    <div className={classnames} onClick={onClick}>
      <span className="input-group-text">
        <i className="material-icons">clear</i>
      </span>
    </div>
  );
};

Clear.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default Clear;
