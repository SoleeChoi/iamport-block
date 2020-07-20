import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';

jQuery($ => {
  const MOUNT_NODE = document.getElementById('iamport-block-wrapper');
  if (MOUNT_NODE) {
    const { iamportAttributes } = $(MOUNT_NODE).data();

    ReactDOM.render(
      <App attributes={iamportAttributes} />,
      MOUNT_NODE,
    );
  }
});