import React from 'react';

import Item from 'src/components/molecules/Item';

const Section = ({
  title,
  list,
}) => (
  <div className="col-md">
    <div className="Result-title">
      { title }
    </div>

    {list.map(item =>
      <Item
        key={`item-${title}-${item.id}`}
        { ...item }
      />)}
  </div>
);

export default Section;
