import moment from 'moment';

// css string을 object로 변환
export function getButtonStyle(buttonStyle) {
  const buttonStyleObj = {};
  buttonStyle.split(';').forEach(eachStyle => {
    const[key, value] = eachStyle.split(':');
    if (key) {
      const keyToCamelCase = key.trim().replace(/([-][a-z])/ig, $1 => $1.toUpperCase().replace('-', ''));
      buttonStyleObj[keyToCamelCase] = value.trim();
    }
  });
  return buttonStyleObj;
}

// 모달 열었을때 셋팅되어있는 기본 값 계산
export function getDefaultFieldValues(attributes) {
  const { payMethods, amountType, amountOptions, customFields } = attributes;
  const [pay_method] = payMethods;
  const [{ label }] = amountOptions;

  const defaultFieldValues = { pay_method };
  if (amountType !== 'variable') {
    defaultFieldValues.amount = label;
  }

  customFields.forEach(({ label, type, options, agreementOptions }) => {
    // default값을 갖을 수 있는 입력 필드의 경우, default값을 설정
    const [defaultValue] = options;
    switch (type) {
      case 'checkbox': {
        defaultFieldValues[label] = [defaultValue];
        break;
      }
      case 'dropdown':
      case 'radio': {
        defaultFieldValues[label] = defaultValue;
        break;  
      }
      case 'agreement': {
        agreementOptions.forEach(({ label }) => {
          defaultFieldValues[label] = false;
        });
        break;
      }
      default:
        break;
    }
  });

  return defaultFieldValues;
}

export function getCustomLabels(customFields) {
  const customLabels = [];
  customFields.forEach(({ type, label, agreementOptions }) => {
    if (type === 'agreement') {
      agreementOptions.forEach(agreementOption =>
        customLabels.push(agreementOption.label)
      );
    } else {
      customLabels.push(label);
    }
  });

  return customLabels;
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

function getAmountInfo(attributes, amount) {
  const { amountType, amountOptions } = attributes;
  if (amountType === 'free') {
    // 무료형은 걸제 금액과 면세 금액이 모두 0원이다
    return { amount: 0, taxFreeAmount: 0 };
  }

  if (amountType === 'fixed' || amountType === 'selection') {
    const [targetOption] = amountOptions.filter(({ label, value }) =>
      // 고정형은 라벨과 비교하고, 선택형은 값과 비교한다
      (amountType === 'fixed' ? label : value) === amount,
    );
    if (targetOption) {
      // 고정형 또는 선택형이면, 선택된 라벨과 매칭되는 값을 찾아 number로 파싱해 리턴한다
      const { value, taxFreeAmount } = targetOption;
      return {
        amount: parseInt(value, 10),
        taxFreeAmount: taxFreeAmount ? parseInt(taxFreeAmount, 10) : 0,
      };
    }
  }
  /**
   * 가변형이면, 입력된 값을 number로 파싱해 리턴한다
   * 고정형과 선택형은 코드를 제대로 짰다면 여기에 도달할 수 없다
   */
  return { amount: parseInt(amount, 10), taxFreeAmount: 0 };
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

function getCustomValue(values, { label, type, agreementOptions }) {
  const value = values[label];
  switch (type) {
    case 'address': {
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
    case 'checkbox':
      return value.join(', ');
    case 'agreement': {
      const agreedLabels = agreementOptions.map(option => {
        if (values[label][option.label]) {
          return label;
        }
      });
      return agreedLabels.join(', ');
    }
    default:
      return value || '';
  }
}

// 유저가 입력한 값을 기반으로 결제 데이터 계산
export function getPaymentData(values, attributes, type) {
  const { pay_method, amount, buyer_name, buyer_tel, buyer_email } = values;
  const { bizNum, name, currency, redirectAfter, cardQuota, vbankDue, digital, customFields } = attributes;
  const pg = getPg(attributes, pay_method);
  const payMethod = getPayMethod(pay_method);

  const amountInfo = getAmountInfo(attributes, amount);
  const paymentData = {
    name,
    pg,
    pay_method: payMethod,
    buyer_name,
    buyer_tel,
    buyer_email,
    currency,
    redirectAfter,
    tax_free: amountInfo.taxFreeAmount,
    // 정기결제의 경우 결제 금액을 0으로 설정한다
    amount: type === 'payment' ? amountInfo.amount : 0,
  };

  if (payMethod === 'card') {
    // 신용카드 최대 할부 개월수
    paymentData.display = getDisplay(cardQuota);
  } else if (payMethod === 'vbank') {
    // 가상계좌 입금기한
    paymentData.vbank_due = getVbankDue(pay_method, vbankDue);
    if (pg === 'danal') {
      // [다날] 사업자 등록번호
      paymentData.biz_num = bizNum;
    }
  } else if (payMethod === 'phone') {
    // 실물 컨텐츠 여부
    paymentData.digital = digital;
  }

  // 커스텀 입력 필드
  const custom_data = {};
  const file_data = {};
  customFields.forEach(field => {
    const { label, type } = field;
    if (type === 'file') {
      file_data[label] = values[label] || '';
    } else {
      custom_data[label] = getCustomValue(values, field);
    }
  });

  if (Object.keys(custom_data).length !== 0) {
    paymentData.custom_data = custom_data;
  }
  paymentData.file_data = file_data;

  return paymentData;
}

export function getOrderData(paymentData) {
  const orderData = new FormData();
  const {
    name,
    amount,
    pay_method,
    currency,
    tax_free,
    buyer_name,
    buyer_email,
    buyer_tel,
    custom_data,
    file_data,
    redirectAfter,
  } = paymentData;

  orderData.append('action', 'get_order_uid');
  orderData.append('order_title', name);
  orderData.append('tax_free_amount', tax_free);
  orderData.append('order_amount', amount);
  orderData.append('buyer_name', buyer_name);
  orderData.append('buyer_email', buyer_email);
  orderData.append('buyer_tel', buyer_tel);
  if (currency) {
    orderData.append('currency', currency || 'KRW');
  }
  if (pay_method) {
    orderData.append('pay_method', pay_method);
  }
  if (custom_data) {
    orderData.append('extra_fields', JSON.stringify(custom_data));
  }
  if (redirectAfter) {
    orderData.append('redirect_after', redirectAfter);
  }

  Object.keys(file_data).forEach(key => {
    orderData.append(key, file_data[key]);
  });

  return orderData;
}