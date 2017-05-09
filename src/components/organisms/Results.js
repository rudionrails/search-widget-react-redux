import React from 'react';
import PropTypes from 'prop-types';

import Section from 'src/components/molecules/Section';

const Results = ({
  className,
  results,
}) => (
  <div className={`Results ${className}`}>
    <div class="container-fluid">
      <div className="row">
        {results.map(result =>
          <Section
            key={`section-${result.title}`}
            { ...result }
          />)}
      </div>
    </div>
  </div>
);

Results.propTypes = {
  className: PropTypes.string,
  results: PropTypes.array.isRequired,
};

export default Results;
