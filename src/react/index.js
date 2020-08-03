import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';

jQuery($ => {
  const PAYMENT_NODES = document.getElementsByClassName('iamport-payment-wrapper');
  for (let i = 0; i < PAYMENT_NODES.length; i++) {
    const { iamportAttributes } = $(PAYMENT_NODES[i]).data();

    ReactDOM.render(
      <App attributes={iamportAttributes} type="payment" />,
      PAYMENT_NODES[i],
    );
  }

  const SUBSCRIPTION_NODES = document.getElementsByClassName('iamport-subscription-wrapper');
  for (let i = 0; i < SUBSCRIPTION_NODES.length; i++) {
    const { iamportAttributes } = $(SUBSCRIPTION_NODES[i]).data();

    ReactDOM.render(
      <App attributes={iamportAttributes} type="subscription" />,
      SUBSCRIPTION_NODES[i],
    );
  }
});