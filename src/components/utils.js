import {
  PGS,
  PGS_FOR_SAMSUNG,
  PGS_FOR_PHONE,
  BASIC_KEYS,
  DEFAULT_AMOUNT_OPTIONS,
  PAY_METHODS,
  DEFAULT_PGS,
  DEFAULT_PG_MIDS,
} from '../constants';

const { __ } = wp.i18n;

export function getPgLists(payMethod) {
  switch (payMethod) {
    case 'kakaopay':
      return ['kakaopay'];
    case 'paypal':
      return ['paypal'];
    case 'samsung':
      return PGS_FOR_SAMSUNG;
    case 'phone':
      return PGS_FOR_PHONE;
    default: {
      return PGS;
    }
  }
}

export function getPgLabel(pg) {
  switch (pg) {
    case 'html5_inicis':
      return __('KG이니시스', 'iamport_block');
    case 'mobilians':
      return __('모빌리언스', 'iamport_block');
    case 'nice':
      return __('나이스정보통신', 'iamport_block');
    case 'danal':
    case 'danal_tpay':
      return __('다날', 'iamport_block');
    case 'kakaopay':
      return __('카카오페이', 'iamport_block');
    case 'paypal':
      return __('페이팔', 'iamport_block');
    case 'kcp':
      return __('NHN KCP', 'iamport_block');
    case 'uplus':
      return __('LG U+', 'iamport_block');
    case 'jtnet':
        return __('JTNET', 'iamport_block');
    default:
      return pg;
  }
}

export function getDefaultAttributes(attributes) {
  const {
    buttonName,
    title,
    description,
    name,
    amountType,
    amountOptions,
    taxFreeAmount,
    payMethods,
    pgs,
    pgMids,
    cardQuota,
    vbankDue,
  } = attributes;

  return {
    buttonName: buttonName || __('결제하기', 'iamport-block'),
    title: title || __('참가권 결제', 'iamport-block'),
    description: description || __('아래 정보를 기입 후 결제를 진행해주세요.', 'iamport-block'),
    name: name || __('아임포트 워드프레스 결제버튼 생성 플러그인 주문', 'iamport-block'),
    amountType: amountType || 'variable',
    amountOptions: amountOptions || DEFAULT_AMOUNT_OPTIONS,
    taxFreeAmount: taxFreeAmount || 0,
    payMethods: payMethods || Object.keys(PAY_METHODS),
    pgs: pgs || DEFAULT_PGS, 
    pgMids: pgMids || DEFAULT_PG_MIDS, 
    cardQuota: cardQuota || 0,
    vbankDue: vbankDue || 0,
  };
}

export function getNewAttributes(values) {
  const attributes = {};
  Object.keys(values).forEach(key => {
    const value = values[key];
    if (BASIC_KEYS.indexOf(key) !== -1) {
      switch (key) {
        case 'pgMids': {
          if (value) {
            /**
             * PG상점아이디는 나중에 PG.PG상점아이디가 되어야 하므로
             * 값을 저장하기 전에 whitespace는 모두 trim
             */
            const trimmedPgMids = {};
            Object.keys(value).forEach(method => {
              const pgMid = value[method];
              trimmedPgMids[method] = pgMid ? pgMid.trim() : pgMid;
            });
            attributes[key] = trimmedPgMids;
          }
          break;
        }
        case 'taxFreeAmount': {
          /**
           * 면세 금액 입력 필드의 type은 number으로 정의되어 있지만,
           * 값을 입력한 후에는 string으로 인식하므로
           * 값을 저장하기 전에 number로 type을 치환한 후 저장한다
           */
          attributes[key] = parseInt(value, 10);
          break;
        }
        default: {
          attributes[key] = value;
          break;
        }
      }
    }
  });
  return attributes;
}