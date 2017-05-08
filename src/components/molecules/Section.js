import React from 'react';
import PropTypes from 'prop-types';

import Item from 'src/components/molecules/Item';
import './Section.css';

const Section = ({
  title,
  list,
}) => (
  <div className="Section col-md">
    <h5 className="Section-title">{ title }</h5>

    {list.map(item =>
      <Item
        key={`item-${title}-${item.id}`}
        { ...item }
      />)}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};

export default Section;
