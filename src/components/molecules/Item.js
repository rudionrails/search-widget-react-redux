import React from 'react';

const Item = ({
  id,
  title,
  url,
}) => (
  <div className="Result card">
    <div className="card-block">
      <div class="card-header">
        { title }
      </div>
      <div class="card-block">
        <h4 class="card-title">{ url }</h4>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
  </div>
);

export default Item;
