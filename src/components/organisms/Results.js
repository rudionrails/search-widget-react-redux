import React from 'react';
import PropTypes from 'prop-types';

import Section from 'src/components/molecules/Section';
import './Results.css';

const Results = ({
  className,
  results,
}) => (
  <div className={`Results container-fluid ${className}`}>
    <div className="row">
      {results.map(result =>
        <Section
          key={`section-${result.title}`}
          { ...result }
        />)}
    </div>
  </div>
);

Results.propTypes = {
  className: PropTypes.string,
  results: PropTypes.array.isRequired,
};

export default Results;
