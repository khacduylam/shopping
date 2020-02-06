import React from "react";
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, size, imageUrl, linkUrl, history }) => (
  <div
    className={size ? `${size} menu-item` : 'menu-item'}
    onClick={() => { history.push(linkUrl) }}
  >
    <div
      className='background-image'
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">BUY NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);