import React, { Component } from 'react';

import SHOP_DATA from "./shop.data";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import './shop.styles.scss';

class ShopPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA
    };
  }

  render() {
    const { collections } = this.state;
    const preCollections = collections.map(
      ({ id, ...rest }) => (<CollectionPreview key={id} {...rest}  />)
    );

    return (
      <div className='shop-page'>
        {preCollections}
      </div>
    );
  }
}

export default ShopPage;