import moment from 'moment';

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

function getAmount(attributes, amount) {
  const { amountType, amountOptions } = attributes;
  if (amountType === 'fixed') {
    const [targetOption] = amountOptions.filter(({ label }) => label === amount);
    if (targetOption) {
      // 고정형이면, 선택된 라벨과 매칭되는 값을 찾아 number로 파싱해 리턴한다
      const { value } = targetOption;
      return parseInt(value, 10);
    }
  }
  /**
   * 가변형 또는 선택형이면, 입력된 값을 number로 파싱해 리턴한다
   * 고정형은 코드를 제대로 짰다면 여기에 도달할 수 없다
   */
  return parseInt(amount, 10);
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
  const { pay_method, amount, buyer_name, buyer_tel, buyer_email } = values;
  const { name, taxFreeAmount, cardQuota, vbankDue, digital, customFields } = attributes;
  const pg = getPg(attributes, pay_method);
  const payMethod = getPayMethod(pay_method);

  const paymentData = {
    name,
    pg,
    pay_method: payMethod,
    tax_free: taxFreeAmount || 0,
    buyer_name,
    buyer_tel,
    buyer_email,
    amount: getAmount(attributes, amount),
  };

  if (payMethod === 'card') {
    // 신용카드 최대 할부 개월수
    paymentData.display = getDisplay(cardQuota);
  } else if (payMethod === 'vbank') {
    // 가상계좌 입금기한
    paymentData.vbank_due = getVbankDue(pay_method, vbankDue);
  } else if (payMethod === 'phone') {
    // 실물 컨텐츠 여부
    paymentData.digital = digital;
  }

  const custom_data = {};
  Object.keys(values).forEach(key => {
    const value = values[key];
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
  });

  if (Object.keys(custom_data).length !== 0) {
    paymentData.custom_data = custom_data;
  }
  return paymentData;
}