import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

/*
<div className="Item card">
  <div className="Item-content card-block media">
      <i className="Item-avatar material-icons">account_circle</i>

      <div className="media-body">
        <h5 className="Item-title">{ title }</h5>
        <p className="Item-body card-text">{ url }</p>
      </div>
    </div>
</div>
*/

const Item = ({
  title,
  url,
}) => (
  <div className="Item panel">
    <div className="panel-body">
      <div className="media">
        <div className="media-left">
          <i className="Item-avatar material-icons media-object">account_circle</i>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{ title }</h4>
          { url }
        </div>
      </div>
    </div>
  </div>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Item;
