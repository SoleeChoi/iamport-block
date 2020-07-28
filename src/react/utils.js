import moment from 'moment';

import { PAYMENT_DATA_KEYS } from '../constants';

// 모달 열었을때 셋팅되어있는 기본 값 계산
export function getDefaultFieldValues() {
  const getDefaultFieldValues = {};
  return getDefaultFieldValues;
}

function getPg({ pgs, pgMids }, payMethod) {
  const pg = pgs[payMethod];
  const pgMid = pgMids[payMethod];
  if (pgMid) {
    // PG상점 아이디가 입력된 경우, PG.PG상점아이디 값을 리턴한다
    return `${pg}.${pgMid}`;
  }
  return pg;
}

function getPayMethod(method) {
  switch (method) {
    case 'kakaopay':
    case 'paypal':
      // 카카오페이와 페이팔의 결제 수단은 신용카드로 한정한다
      return 'card';
    default:
      return method;
  }
}

function getCardQuota(cardQuota) {
  switch (cardQuota) {
    case 0:
      // PG사 기본 제공 값 사용
      return undefined;
    case 1:
      // 일시불만 가능 (할부 불가)
      return [];
    default: {
      // 최대 X개월 할부
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
    // X일 후 자정까지
    return moment().add(vbankDue, 'days').format('YYYYMMDD2359');
  }
  // PG사 기본 제공 값 사용
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
    return fullAddress;
  }
  return value;
}

// 유저가 입력한 값을 기반으로 결제 데이터 계산
export function getPaymentData(values, attributes) {
  const { pay_method } = values;
  const { name, taxFreeAmount, cardQuota, vbankDue, customFields } = attributes;
  const pg = getPg(attributes, pay_method);
  const payMethod = getPayMethod(pay_method);

  const paymentData = {
    name,
    pg,
    pay_method: payMethod,
  };

  const custom_data = {};

  if (payMethod === 'card') {
    paymentData.display = getDisplay(cardQuota);
  } else if (payMethod === 'vbank') {
    paymentData.vbank_due = getVbankDue(pay_method, vbankDue);
  }

  if (taxFreeAmount) {
    paymentData.tax_free = taxFreeAmount;
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