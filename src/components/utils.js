import { PGS, PGS_FOR_SAMSUNG, PGS_FOR_PHONE } from '../constants';

const { __ } = wp.i18n;

export function getPgLists(payMethod) {
  switch (payMethod) {
    case 'kakaopay': {
      return ['kakaopay'];
    }
    case 'paypal': {
      return ['paypal'];
    }
    case 'samsung': {
      return PGS_FOR_SAMSUNG;
    }
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