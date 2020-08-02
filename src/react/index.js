import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';

jQuery($ => {
  const MOUNT_NODES = document.getElementsByClassName('iamport-block-wrapper');
  for (let i = 0; i < MOUNT_NODES.length; i++) {
    const { iamportAttributes } = $(MOUNT_NODES[i]).data();

    ReactDOM.render(
      <App attributes={iamportAttributes} />,
      MOUNT_NODES[i],
    );
  }
});