import React from 'react';

import './Section.css';
import Item from 'src/components/molecules/Item';

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

export default Section;
