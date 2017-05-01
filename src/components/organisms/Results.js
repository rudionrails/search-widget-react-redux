import React from 'react';
import PropTypes from 'prop-types';

import Column from 'components/molecules/Column';
import './Results.css';

const Results = ({
  className,
  results,
}) => {
  const columns = Object.entries(results)
                        .map(([heading, list]) => ({ heading, list }));

  return (
    <div className={`Results container-fluid ${className}`}>
      <div className="row">
        {columns.map(({ heading, list }) =>
          <Column
            key={`column-${heading}`}
            heading={heading}
            list={list}
          />)}
      </div>
    </div>
  );
};

Results.PropTypes = {
  className: PropTypes.string,
  results: PropTypes.object.isRequired,
};

export default Results;
