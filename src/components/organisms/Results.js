import React from 'react';
import PropTypes from 'prop-types';
import Section from 'src/components/molecules/Section';

const Results = ({
  className,
  results,
}) => {
  const width = Math.floor(12 / results.length);

  return (
    <div className={`Results ${className}`}>
      <div className="container-fluid">
        <div className="row">
          {results.map(result =>
            <Section
              key={`section-${result.title}`}
              width={width}
              { ...result }
            />)}
        </div>
      </div>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  results: PropTypes.array.isRequired,
};

export default Results;
