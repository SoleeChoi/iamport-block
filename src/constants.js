const { __ } = wp.i18n;

export const PAY_METHODS_FOR_PAYMENT = {
  kakaopay: __('카카오페이', 'iamport-block'),
  samsung: __('삼성페이', 'iamport-block'),
  card: __('신용카드', 'iamport-block'),
  vbank: __('가상계좌', 'iamport-block'),
  trans: __('실시간 계좌이체', 'iamport-block'),
  phone: __('휴대폰 소액결제', 'iamport-block'),
  paypal: __('페이팔', 'iamport-block'),
};

export const PAY_METHODS_FOR_SUBSCRIPTIONS = {
  card: __('신용카드', 'iamport-block'),
  phone: __('휴대폰 소액결제', 'iamport-block'),
};

export const CURRENCY_OPTIONS = {
  KRW: '₩',
  USD: '$',
  EUR: '€',
  JPY: '¥',
};
