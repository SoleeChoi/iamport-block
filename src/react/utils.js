import moment from 'moment';

import { PAYMENT_DATA_KEYS } from '../constants';

function getPg(payMethods, payMethod) {
  const { pg, pgMid } = payMethods[payMethod];
  if (pgMid) {
    return `${pg}.${pgMid}`;
  }
  return pg;
}

function getPayMethod(method) {
  switch (method) {
    case 'kakaopay':
    case 'paypal':
      return 'card';
    default:
      return method;
  }
}

function getCardQuota(cardQuota) {
  switch (cardQuota) {
    case 0: {
      return undefined;
    }
    case 1: {
      return [];
    }
    default: {
      const cardQuotaArr = [];
      for (let i = 2; i <= cardQuota; i++) {
        cardQuotaArr.push(i);
      }
      return cardQuotaArr;
    }
  }
}

function getDisplay(cardQuota) {
  return {
    card_quota: getCardQuota(cardQuota),
  };
}

function getVbankDue(payMethod, vbankDue) {
  if (payMethod === 'vbank' && vbankDue !== -1) {
    return moment().add(vbankDue, 'days').format('YYYYMMDD2359');
  }
  return undefined;
}

function getCustomValue(value, type) {
  if (type === 'address') {
    // 주소 입력 필드
    let fullAddress = '';
    const { address, extraAddress, detailAddress, zipcode } = value;
    if (address) {
      fullAddress += `${address} `;
    }
    if (extraAddress) {
      fullAddress += `${extraAddress} `;
    }
    if (detailAddress) {
      fullAddress += `${detailAddress} `;
    }
    if (zipcode) {
      fullAddress += zipcode;
    }
    console.log(value, fullAddress);
    return fullAddress;
  }
  return value;
}

export function getPaymentData(values, attributes) {
  const { pay_method } = values;
  const { name, cardQuota, vbankDue, payMethods, customFields } = attributes;
  const pg = getPg(payMethods, pay_method);
  const payMethod = getPayMethod(pay_method);

  const paymentData = {
    name,
    pg,
    pay_method: payMethod,
  };

  const custom_data = {};

  if (payMethod === 'card') {
    paymentData.display = getDisplay(cardQuota);
  }
  if (payMethod === 'vbank') {
    paymentData.vbank_due = getVbankDue(pay_method, vbankDue);
  }

  Object.keys(values).forEach(key => {
    const value = values[key];
    if (PAYMENT_DATA_KEYS.indexOf(key) !== -1 && value) {
      paymentData[key] = value;
    } else {
      const [targetField] = customFields.filter(({ label }) => label === key);
      if (targetField) {
        // 커스텀 입력 필드
        const { type } = targetField;
        const customValue = getCustomValue(value, type);
        if (customValue) {
          // 값이 입력된 경우에만 집어 넣기
          custom_data[key] = customValue;
        }
      }
    }
  });

  if (Object.keys(custom_data).length !== 0) {
    paymentData.custom_data = custom_data;
  }

  return paymentData;
}