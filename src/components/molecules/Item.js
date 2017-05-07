import React from 'react';
import './Item.css';

const Item = ({
  id,
  title,
  url,
}) => (
  <div className="Item card">
    <div className="Item-content card-block media">
        <i className="Item-avatar material-icons">account_circle</i>

        <div className="media-body">
          <h5 className="Item-title">{ title }</h5>
          <p className="Item-body card-text">{ url }</p>
        </div>
      </div>

  </div>
);

export default Item;
