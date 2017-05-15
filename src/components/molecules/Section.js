import React from 'react';
import PropTypes from 'prop-types';

import Item from 'src/components/molecules/Item';
import './Section.css';

const Section = ({
  width = 1,
  title,
  items,
}) => (
  <div className={`sw-Section col-sm-${width}`}>
    <h5 className="sw-Section-title">{ title }</h5>

    {items.map(item =>
      <Item
        key={`item-${title}-${item.id}`}
        { ...item }
      />)}
  </div>
);

Section.propTypes = {
  width: PropTypes.number,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default Section;
