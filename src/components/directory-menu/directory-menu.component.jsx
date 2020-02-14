import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSections } from '../../redux/directory/directory.selectors';

import MenuItem from "../menu-item/menu-item.component";

import './directory-menu.styles.scss';

const DirectoryMenu = ({ sections }) => (
  <div className='directory-menu'>
    {
      sections.map(({ id, ...rest }) => (<MenuItem key={id} {...rest} />))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectSections
});

export default connect(mapStateToProps)(DirectoryMenu);