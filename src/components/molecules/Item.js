import React from 'react';
import PropTypes from 'prop-types';

import './Item.css';

class Item extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  static contextTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const { title, url } = this.props;
    const { onClick } = this.context;

    return (
      <div className="sw-Item card" onClick={() => onClick(url)}>
        <div className="card-body p-3">
          <div className="media">
            <i className="sw-Item-avatar material-icons mr-3">account_circle</i>

            <div className="media-body">
              <h5 className="mt-0">{ title }</h5>
              <small>{ url }</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
