import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/molecules/Row';

const Column = ({
  heading,
  list,
}) => (
  <div className="col-md">
    <div className="Result-heading">
      { heading }
    </div>

    {list.map(value =>
      <Row
        key={`row-${value}`}
        value={value}
      />)}
  </div>
);

Column.PropTypes = {
  heading: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};

export default Column;
