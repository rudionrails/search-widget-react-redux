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
      <div className="sw-Item panel" onClick={() => onClick(url)}>
        <div className="panel-body">
          <div className="media">
            <div className="media-left">
              <i className="sw-Item-avatar material-icons media-object">account_circle</i>
            </div>

            <div className="media-body">
              <h4 className="media-heading">{ title }</h4>
              { url }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
