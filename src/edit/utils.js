import {
  PGS,
  PGS_FOR_SAMSUNG,
  PGS_FOR_PHONE,
  PGS_FOR_SUBSCRIPTION_BY_CARD,
  PGS_FOR_SUBSCRIPTION_BY_PHONE,
  BASIC_KEYS,
  DEFAULT_AMOUNT_OPTIONS,
  DEFAULT_PGS,
  DEFAULT_PG_MIDS,
  DEFAULT_AGREEMENT_OPTIONS,
} from './constants';
import { PAY_METHODS_FOR_PAYMENT, PAY_METHODS_FOR_SUBSCRIPTIONS } from '../constants';

const { __ } = wp.i18n;

export function getPgLists(payMethod, type) {
  // 일반결제용 PG사
  if (type === 'payment') {
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
  // 정기결제용 PG사
  if (payMethod === 'card') {
    return PGS_FOR_SUBSCRIPTION_BY_CARD;
  }
  return PGS_FOR_SUBSCRIPTION_BY_PHONE;
}

export function getPgLabel(pg) {
  switch (pg) {
    case 'html5_inicis':
      return __('KG이니시스', 'iamport-block');
    case 'mobilians':
      return __('모빌리언스', 'iamport-block');
    case 'nice':
      return __('나이스정보통신', 'iamport-block');
    case 'danal':
    case 'danal_tpay':
      return __('다날', 'iamport-block');
    case 'kakaopay':
      return __('카카오페이', 'iamport-block');
    case 'paypal':
      return __('페이팔', 'iamport-block');
    case 'kcp':
      return __('NHN KCP', 'iamport-block');
    case 'uplus':
      return __('LG U+', 'iamport-block');
    case 'jtnet':
        return __('JTNET', 'iamport-block');
    default:
      return pg;
  }
}

export function getPayMethods(type = 'payment') {
  if (type === 'payment') {
    return PAY_METHODS_FOR_PAYMENT;
  }
  return PAY_METHODS_FOR_SUBSCRIPTIONS;
}

export function getDefaultAttributes(type, attributes) {
  const {
    buttonName,
    buttonClassName,
    modalClassName,
    title,
    description,
    name,
    amountType,
    amountOptions,
    currency,
    payMethods,
    pgs,
    pgMids,
    cardQuota,
    vbankDue,
    digital,
    redirectAfter,
  } = attributes;

  return {
    buttonName: buttonName || __('결제하기', 'iamport-block'),
    buttonClassName,
    modalClassName,
    title: title || __('참가권 결제', 'iamport-block'),
    description,
    name: name || __('아임포트 워드프레스 블록 플러그인 주문', 'iamport-block'),
    amountType: amountType || 'variable',
    amountOptions: amountOptions || DEFAULT_AMOUNT_OPTIONS,
    currency: currency || 'KRW',
    payMethods: payMethods || Object.keys(getPayMethods(type)),
    pgs: pgs || DEFAULT_PGS, 
    pgMids: pgMids || DEFAULT_PG_MIDS, 
    cardQuota: cardQuota || 0,
    vbankDue: vbankDue || 0,
    digital,
    redirectAfter,
  };
}

export function getDefaultErrorFields(customFields) {
  return customFields.map(({ type, options, agreementOptions }) => {
    const errorField = { label: '' };
    if (type === 'agreement') {
      const lengthOfAgreementOptions = agreementOptions.length;
      errorField.agreementOptions = Array(lengthOfAgreementOptions).fill({ label: '', link: '' });
    }
    if (type === 'radio' || type === 'checkbox' || type === 'dropdown') {
      const lengthOfOptions = options.length;
      errorField.options = Array(lengthOfOptions).fill('');
    }
    return errorField;
  });
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
        default: {
          attributes[key] = value;
          break;
        }
      }
    }
  });
  return attributes;
}

export function getDefaultOptions(type) {
  if (type === 'options') {
    return [''];
  }
  return DEFAULT_AGREEMENT_OPTIONS;
}